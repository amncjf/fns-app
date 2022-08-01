"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryDetailForTransactionHash = exports.getHistoryWithDetail = exports.getHistory = void 0;
const address_encoder_1 = require("@ensdomains/address-encoder");
const ethers_1 = require("ethers");
const contentHash_1 = require("../utils/contentHash");
const makeHashIndexes_1 = require("../utils/makeHashIndexes");
const eventFormat = {
    Domain: {
        NewOwner: (args) => ({ owner: args.owner.id }),
        NewResolver: (args) => ({ resolver: args.resolver.id.split('-')[0] }),
        Transfer: (args) => ({ owner: args.owner.id }),
        NewTTL: (args) => ({ ttl: args.ttl }),
    },
    Registration: {
        NameRegistered: (args) => ({
            registrant: args.registrant.id,
            expiryDate: args.expiryDate,
        }),
        NameRenewed: (args) => ({ expiryDate: args.expiryDate }),
        NameTransferred: (args) => ({ owner: args.newOwner.id }),
    },
    Resolver: {
        AddrChanged: (args) => ({ addr: args.addr.id }),
        MulticoinAddrChanged: (args) => {
            const format = address_encoder_1.formatsByCoinType[parseInt(args.coinType)];
            if (!format) {
                return {
                    coinType: args.coinType,
                    rawAddr: args.multiaddr,
                };
            }
            if (ethers_1.ethers.utils.hexStripZeros(args.multiaddr) === '0x') {
                return {
                    coinType: args.coinType,
                    coinName: format.name,
                    rawAddr: '0x',
                };
            }
            return {
                coinType: args.coinType,
                coinName: format.name,
                addr: format.encoder(Buffer.from(args.multiaddr.slice(2), 'hex')),
            };
        },
        NameChanged: (args) => ({ name: args.name }),
        AbiChanged: (args) => ({ contentType: args.contentType }),
        PubkeyChanged: (args) => ({ x: args.x, y: args.y }),
        TextChanged: (args) => ({ key: args.key }),
        ContenthashChanged: (args) => ({ hash: (0, contentHash_1.decodeContenthash)(args.hash) }),
        InterfaceChanged: (args) => ({
            interfaceId: args.interfaceId,
            implementer: args.implementer,
        }),
        AuthorisationChanged: (args) => ({
            owner: args.owner,
            target: args.target,
            isAuthorized: args.isAuthorized,
        }),
    },
};
const mapEvents = (eventArray, type) => eventArray.map((event) => ({
    type: event.__typename,
    blockNumber: event.blockNumber,
    transactionHash: event.transactionID,
    id: event.id,
    data: eventFormat[type][event.__typename](event),
}));
const mapResultDetailDecode = (publicResolver) => (result) => {
    const hashIndexes = (0, makeHashIndexes_1.makeOtherIndexes)(result.input, '10f13a8c');
    const abiLengths = hashIndexes.map((x) => ({
        index: x,
        length: x === 0
            ? ethers_1.ethers.utils.hexDataLength(result.input)
            : parseInt(ethers_1.ethers.utils.hexDataSlice(result.input, x - 32, x), 16),
    }));
    const ABIs = abiLengths.map(({ index, length }) => ethers_1.ethers.utils.hexDataSlice(result.input, index, index + length));
    return ABIs.map((abi) => {
        try {
            return publicResolver.interface.decodeFunctionData('setText(bytes32,string,string)', abi);
        }
        catch {
            return;
        }
    });
};
const expandDecode = (prev, curr) => {
    if (!curr)
        return [...prev, { value: null }];
    if (!curr.length)
        return [...prev, curr];
    return [...prev, ...curr];
};
async function getHistory({ gqlInstance }, name) {
    const client = gqlInstance.client;
    const query = gqlInstance.gql `
      query getHistory($name: String!, $label: String!) {
        domains(where: { name: $name }) {
          events {
            id
            blockNumber
            transactionID
            __typename
            ...on Transfer {
              owner {
                id
              }
            }
            ...on NewOwner {
              owner {
                id
              }
            }
            ...on NewResolver {
              resolver {
                id
              }
            }
            ...on NewTTL {
              ttl
            }
          }
          owner {
            registrations (where: { labelName: $label }) {
              events {
                id
                blockNumber
                transactionID
                __typename
                ...on NameRegistered {
                  registrant {
                    id
                  }
                  expiryDate
                }
                ...on NameRenewed {
                  expiryDate
                }
                ...on NameTransferred {
                  newOwner {
                    id
                  }
                }
              }
            }
          }
          resolver {
            events {
              id
              blockNumber
              transactionID
              __typename
              ...on AddrChanged {
                addr {
                  id
                }
              }
              ...on MulticoinAddrChanged {
                coinType
                multiaddr: addr
              }
              ...on NameChanged {
                name
              }
              ...on AbiChanged {
                contentType
              }
              ...on PubkeyChanged {
                x
                y
              }
              ...on TextChanged {
                key
              }
              ...on ContenthashChanged {
                hash
              }
              ...on InterfaceChanged {
                interfaceID
                implementer
              }
              ...on AuthorisationChanged {
                owner
                target
                isAuthorized
              }
            }
          }
        }
      }
      `;
    const label = name.split('.')[0];
    const { domains } = await client.request(query, { name, label });
    if (!domains || domains.length === 0)
        return;
    const [{ events: domainEvents, owner: { registrations: [{ events: registrationEvents }], }, resolver: { events: resolverEvents }, },] = domains;
    const domainHistory = mapEvents(domainEvents, 'Domain');
    const registrationHistory = mapEvents(registrationEvents, 'Registration');
    let resolverHistory = mapEvents(
    // remove duplicate events for ETH cointype
    resolverEvents.filter((event) => !event.coinType || event.coinType !== '60'), 'Resolver');
    return {
        domain: domainHistory,
        registration: registrationHistory,
        resolver: resolverHistory,
    };
}
exports.getHistory = getHistory;
async function getHistoryWithDetail({ contracts, gqlInstance, provider, }, name) {
    const historyRes = await getHistory({ gqlInstance }, name);
    if (!historyRes)
        return;
    const { domain, registration, resolver: resolverHistory } = historyRes;
    const textEvents = resolverHistory.filter((event) => event.type === 'TextChanged');
    const transactions = textEvents.reduce((prev, curr) => {
        if (prev.includes(curr.transactionHash)) {
            return prev;
        }
        return [...prev, curr.transactionHash];
    }, []);
    const publicResolver = await contracts?.getPublicResolver();
    const fetchResult = (await ethers_1.ethers.utils.fetchJson(provider.connection, JSON.stringify(transactions.map((tx, i) => ({
        jsonrpc: '2.0',
        id: i,
        method: 'eth_getTransactionByHash',
        params: [tx],
    })))))
        .map((result) => result.result)
        .map(mapResultDetailDecode(publicResolver))
        .reduce(expandDecode, []);
    const detailedResolverHistory = resolverHistory.map((event) => {
        if (event.type !== 'TextChanged')
            return event;
        const { id } = event;
        const matchedTextInx = textEvents.findIndex((x) => x.id === id);
        return {
            ...event,
            data: {
                ...event.data,
                value: fetchResult[matchedTextInx] && fetchResult[matchedTextInx].value,
            },
        };
    });
    return {
        domain,
        registration,
        resolver: detailedResolverHistory,
    };
}
exports.getHistoryWithDetail = getHistoryWithDetail;
async function getHistoryDetailForTransactionHash({ contracts, provider }, hash, indexInTransaction) {
    const publicResolver = await contracts?.getPublicResolver();
    const transaction = await provider.getTransaction(hash);
    if (!transaction)
        return;
    const result = mapResultDetailDecode(publicResolver)({
        input: transaction.data,
    });
    if (!result || !result.length)
        return;
    if (typeof indexInTransaction === 'number') {
        if (indexInTransaction + 1 > result.length)
            return;
        const resultItem = result[indexInTransaction];
        if (!resultItem ||
            !resultItem.key ||
            (!resultItem.value && resultItem.value !== ''))
            return;
        return { key: resultItem.key, value: resultItem.value };
    }
    return result.map((item) => {
        if (!item.key)
            return;
        if (!item.value && item.value !== '')
            return { key: item.key, value: null };
        return { key: item.key, value: item.value };
    });
}
exports.getHistoryDetailForTransactionHash = getHistoryDetailForTransactionHash;
