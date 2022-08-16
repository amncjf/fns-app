"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var Ve=require("react"),n=require("styled-components"),So=require("react-dom"),Wt=require("react-transition-state");function Lo(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}function Nt(e){if(e&&e.__esModule)return e;var t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});return e&&Object.keys(e).forEach(function(o){if(o!=="default"){var a=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(t,o,a.get?a:{enumerable:!0,get:function(){return e[o]}})}}),t.default=e,Object.freeze(t)}var r=Nt(Ve),d=Lo(n),Ro=Nt(So);const To=d.default.div(({theme:e,$shape:t,$noBorder:o})=>n.css`
    ${()=>{switch(t){case"circle":return n.css`
            border-radius: ${e.radii.full};
            &:after {
              border-radius: ${e.radii.full};
            }
          `;case"square":return n.css`
          border-radius: ${e.radii["2xLarge"]}
          &:after {
            border-radius: ${e.radii["2xLarge"]}
          }
        `;default:return n.css``}}}

    ${!o&&n.css`
      &::after {
        box-shadow: ${e.shadows["-px"]} ${e.colors.foregroundTertiary};
        content: '';
        inset: 0;
        position: absolute;
      }
    `}

    background-color: ${e.colors.foregroundSecondary};

    width: 100%;
    padding-bottom: 100%;

    > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    overflow: hidden;
    position: relative;
  `),Vo=d.default.div(({theme:e})=>n.css`
    background: ${e.colors.gradients.blue};

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `),Mo=d.default.img(({$shown:e})=>n.css`
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: none;

    ${e&&n.css`
      display: block;
    `}
  `),Pe=({label:e,noBorder:t=!1,shape:o="circle",src:a,...s})=>{const[i,l]=r.useState(!!a);return r.useEffect(()=>{l(!1)},[a]),r.createElement(To,{$noBorder:!i||t,$shape:o},!i&&r.createElement(Vo,{"aria-label":e}),r.createElement(Mo,{...s,$shown:i,alt:e,decoding:"async",src:a,onError:()=>l(!1),onLoad:()=>l(!0)}))};Pe.displayName="Avatar";const Ie=d.default.div(({theme:e,$state:t,$empty:o})=>n.css`
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow: hidden;
    z-index: 999;
    top: 0;
    left: 0;
    transition: ${e.transitionDuration[300]} all
      ${e.transitionTimingFunction.popIn};

    ${!o&&t==="entered"?n.css`
          background-color: rgba(
            0,
            0,
            0,
            ${e.shades.backgroundHideFallback}
          );

          @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
            backdrop-filter: blur(16px);
            background-color: ${e.colors.backgroundHide};
          }
        `:n.css`
          background-color: rgba(0, 0, 0, 0);
          @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
            backdrop-filter: blur(0px);
          }
        `}
  `),X=d.default.div(()=>n.css`
    border-width: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `),Po=n.keyframes`
  100% {
    transform: rotate(1turn);
  }
`,Bo=d.default.div(({theme:e,$color:t,$size:o})=>n.css`
    animation: ${Po} 1.1s linear infinite;

    color: ${e.colors[t]};
    stroke: ${e.colors[t]};

    ${()=>{switch(o){case"small":return n.css`
            height: ${e.space[6]};
            stroke-width: ${e.space["1.25"]};
            width: ${e.space[6]};
          `;case"large":return n.css`
            height: ${e.space[16]};
            stroke-width: ${e.space[1]};
            width: ${e.space[16]};
          `;default:return""}}}
  `),me=r.forwardRef(({accessibilityLabel:e,size:t="small",color:o="text",...a},s)=>r.createElement(Bo,{$color:o,$size:t,ref:s,...a},e&&r.createElement(X,null,e),r.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},r.createElement("circle",{cx:"12",cy:"12",fill:"none",r:"9",strokeDasharray:"42",strokeLinecap:"round"}),r.createElement("circle",{cx:"12",cy:"12",fill:"none",opacity:"0.25",r:"9",strokeLinecap:"round"}))));me.displayName="Spinner";const Go=d.default.div(({theme:e,$ellipsis:t,$variant:o,$size:a,$color:s,$weight:i,$font:l})=>n.css`
    font-family: ${e.fonts[l]};
    letter-spacing: ${e.letterSpacings["-0.01"]};
    letter-spacing: ${e.letterSpacings["-0.015"]};
    line-height: ${e.lineHeights.normal};

    ${t&&n.css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}

    ${()=>{switch(o){case"small":return n.css`
            font-size: ${e.fontSizes.small};
            font-weight: ${e.fontWeights.normal};
            letter-spacing: ${e.letterSpacings["-0.01"]};
            line-height: ${e.lineHeights.normal};
          `;case"large":return n.css`
            font-size: ${e.fontSizes.large};
            font-weight: ${e.fontWeights.normal};
            letter-spacing: ${e.letterSpacings["-0.02"]};
            line-height: ${e.lineHeights[2]};
          `;case"extraLarge":return n.css`
            font-size: ${e.fontSizes.extraLarge};
            font-weight: ${e.fontWeights.medium};
            letter-spacing: ${e.letterSpacings["-0.02"]};
            line-height: ${e.lineHeights[2]};
          `;case"label":return n.css`
            color: ${e.colors.text};
            font-size: ${e.fontSizes.label};
            font-weight: ${e.fontWeights.bold};
            letter-spacing: ${e.letterSpacings["-0.01"]};
            text-transform: capitalize;
          `;case"labelHeading":return n.css`
            color: ${e.colors.text};
            font-size: ${e.fontSizes.small};
            font-weight: ${e.fontWeights.bold};
            letter-spacing: ${e.letterSpacings["-0.01"]};
            text-transform: capitalize;
          `;default:return""}}}

  ${s&&n.css`
      color: ${e.colors[s]};
    `}

  ${a&&n.css`
      font-size: ${e.fontSizes[a]};
    `}

  ${i&&n.css`
      font-weight: ${e.fontWeights[i]};
    `}
  `),I=r.forwardRef(({as:e="div",children:t,ellipsis:o,variant:a,className:s,weight:i,font:l="sans",color:c,size:u,...g},w)=>r.createElement(Go,{...g,$color:c,$ellipsis:o?!0:void 0,$font:l,$size:u,$variant:a,$weight:i,as:e,className:s,ref:w},t));I.displayName="Typography";const zo=({center:e,size:t,side:o,theme:a})=>e&&n.css`
    position: absolute;
    ${o}: ${t==="medium"?a.space[4]:a.space[5]};
  `,ce=(e,t,o,a)=>{if(t==="accent")return e.colors[o];if(t==="grey")switch(o){case"accentText":return e.colors.text;case"accentSecondary":return e.colors.foregroundTertiary;default:return a==="secondary"?e.colors.textSecondary:e.colors[t]}switch(o){case"accent":return e.colors[t];case"accentText":return e.colors.white;case"accentGradient":return e.colors.gradients[t];case"accentSecondary":return`rgba(${e.accentsRaw[t]}, ${e.shades[o]})`;case"accentSecondaryHover":return`rgba(${e.accentsRaw[t]}, ${e.shades[o]})`;default:return""}},Ho=d.default.button(({theme:e,disabled:t,$center:o,$pressed:a,$shadowless:s,$outlined:i,$size:l,$variant:c,$tone:u,$shape:g})=>n.css`
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition-property: all;

    gap: ${e.space[4]};
    transition-duration: ${e.transitionDuration[150]};
    transition-timing-function: ${e.transitionTimingFunction.inOut};
    letter-spacing: ${e.letterSpacings["-0.01"]};
    width: 100%;

    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }

    &:active {
      transform: translateY(0px);
      filter: brightness(1);
    }

    ${t?n.css`
          cursor: not-allowed;
        `:""};
    ${o?n.css`
          position: relative;
        `:""};
    ${a?n.css`
          filter: brightness(0.95);
        `:""};
    ${s?n.css`
          box-shadow: none !important;
        `:""};

    ${i?n.css`
          border: ${e.borderWidths.px} ${e.borderStyles.solid}
            ${e.colors.borderTertiary};
        `:""}

    box-shadow: ${e.shadows["0.25"]} ${e.colors.grey};

    border-radius: ${e.radii.extraLarge};
    font-size: ${e.fontSizes.large};
    padding: ${e.space["3.5"]} ${e.space[4]};

    ${()=>{switch(l){case"extraSmall":return n.css`
            border-radius: ${e.radii.large};
            font-size: ${e.fontSizes.small};
            padding: ${e.space[2]};
          `;case"small":return n.css`
            border-radius: ${e.radii.large};
            font-size: ${e.fontSizes.small};
            height: ${e.space[10]};
            padding: 0 ${e.space[4]};
          `;case"medium":return"";default:return""}}}

    ${()=>{switch(c){case"primary":return n.css`
            color: ${ce(e,u,"accentText")};
            background: ${ce(e,u,"accent")};
          `;case"secondary":return n.css`
            color: ${ce(e,u,"accent","secondary")};
            background: ${ce(e,u,"accentSecondary")};
          `;case"action":return n.css`
            color: ${ce(e,u,"accentText")};
            background: ${ce(e,u,"accentGradient")};
          `;case"transparent":return n.css`
            color: ${e.colors.textTertiary};

            &:hover {
              background-color: ${e.colors.foregroundTertiary};
            }

            &:active {
              background-color: ${e.colors.foregroundTertiary};
            }
          `;default:return""}}}
    
  ${()=>{switch(g){case"circle":return n.css`
            border-radius: ${e.radii.full};
          `;case"square":return n.css`
            border-radius: ${l==="small"?e.radii.large:e.radii["2xLarge"]};
          `;case"rounded":return n.css`
            border-radius: ${e.radii.extraLarge};
          `;default:return""}}}

  ${()=>l==="medium"&&o?n.css`
          padding-left: ${e.space[14]};
          padding-right: ${e.space[14]};
        `:""}

  ${()=>s&&a&&c==="transparent"?n.css`
          background-color: ${e.colors.backgroundSecondary};
        `:""}

    &:disabled {
      background-color: ${e.colors.grey};
      ${c!=="transparent"&&n.css`
        color: ${e.colors.background};
      `}
      transform: translateY(0px);
      filter: brightness(1);
    }
  `),jo=d.default.div(()=>n.css`
    ${zo}
  `),Oo=d.default.div(()=>n.css``),Fo=d.default(I)(({theme:e,$fullWidthContent:t})=>n.css`
    color: inherit;
    font-size: inherit;
    font-weight: ${e.fontWeights.semiBold};
    ${t&&"width: 100%;"}
  `),Be=r.forwardRef(({center:e,children:t,disabled:o,href:a,prefix:s,loading:i,rel:l,shape:c,size:u="medium",suffix:g,tabIndex:w,target:h,tone:v="accent",type:m="button",variant:x="primary",zIndex:$,onClick:C,pressed:y=!1,shadowless:b=!1,outlined:E=!1,fullWidthContent:p=!1,as:k,...P},G)=>{const B=r.createElement(Fo,{$fullWidthContent:p,ellipsis:!0},t);let z;return c?z=i?r.createElement(me,{color:"background"}):B:z=r.createElement(r.Fragment,null,s&&r.createElement(jo,{center:e,size:u,side:"left"},s),B,(i||g)&&r.createElement(Oo,{center:e,size:u,side:"right"},i?r.createElement(me,{color:"background"}):g)),r.createElement(Ho,{...P,$center:e,$fullWidthContent:p,$outlined:E,$pressed:y,$shadowless:b,$shape:c,$size:u,$tone:v,$variant:x,as:k,disabled:o,href:a,position:$&&"relative",ref:G,rel:l,tabIndex:w,target:h,type:m,zIndex:$,onClick:C},z)});Be.displayName="Button";const _t={none:"none",solid:"solid"},Yt={0:"0px",px:"1px","0.375":"0.09375rem","0.5":"0.125rem","0.75":"0.1875rem",1:"0.25rem","1.25":"0.3125rem","1.5":"0.375rem","1.75":"0.4375rem",2:"0.5rem"},It={none:"0",medium:"6px",large:"8px",almostExtraLarge:"10px",extraLarge:"12px","2xLarge":"16px","2.5xLarge":"20px","3xLarge":"24px","4xLarge":"40px",full:"9999px"},Z={none:"none","-px":"inset 0 0 0 1px",0:"0 0 0 0","0.02":"0 2px 8px","0.25":"0 2px 12px","0.5":"0 0 0 0.125rem",1:"0 0 0 0.25rem",2:"0 0 0 0.5rem"},V={light:{blue:"82, 152, 255",lightBlue:"238, 245, 255",green:"73, 179, 147",indigo:"88, 84, 214",orange:"255, 149, 0",pink:"255, 45, 85",purple:"175, 82, 222",red:"213, 85, 85",lightRed:"249, 231, 231",teal:"90, 200, 250",yellow:"255, 204, 0",lightYellow:"255, 248, 219",grey:"232, 232, 235"},dark:{blue:"82, 152, 255",lightBlue:"238, 245, 255",green:"73, 179, 147",indigo:"94, 92, 230",orange:"255, 159, 10",pink:"255, 55, 95",purple:"191, 90, 242",red:"213, 85, 85",lightRed:"249, 231, 231",teal:"100, 210, 255",yellow:"255, 214, 10",lightYellow:"255, 248, 219",grey:"59, 59, 61"}},Se={light:{blue:`rgb(${V.light.blue})`,lightBlue:`rgb(${V.light.lightBlue})`,green:`rgb(${V.light.green})`,indigo:`rgb(${V.light.indigo})`,orange:`rgb(${V.light.orange})`,pink:`rgb(${V.light.pink})`,purple:`rgb(${V.light.purple})`,red:`rgb(${V.light.red})`,lightRed:`rgb(${V.light.lightRed})`,teal:`rgb(${V.light.teal})`,yellow:`rgb(${V.light.yellow})`,lightYellow:`rgb(${V.light.lightYellow})`,grey:`rgb(${V.light.grey})`},dark:{blue:`rgb(${V.dark.blue})`,lightBlue:`rgb(${V.dark.lightBlue})`,green:`rgb(${V.dark.green})`,indigo:`rgb(${V.dark.indigo})`,orange:`rgb(${V.dark.orange})`,pink:`rgb(${V.dark.pink})`,purple:`rgb(${V.dark.purple})`,red:`rgb(${V.dark.red})`,lightRed:`rgb(${V.dark.lightRed})`,teal:`rgb(${V.dark.teal})`,yellow:`rgb(${V.dark.yellow})`,lightYellow:`rgb(${V.dark.lightYellow})`,grey:`rgb(${V.dark.grey})`}},L={light:{background:"255, 255, 255",backgroundSecondary:"246, 246, 248",backgroundTertiary:"246, 246, 248",foreground:"0, 0, 0",groupBackground:"253, 253, 253"},dark:{background:"20, 20, 20",backgroundSecondary:"10, 10, 10",backgroundTertiary:"20, 20, 20",foreground:"255, 255, 255",groupBackground:"10, 10, 10"}},Le={light:{blue:"linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)",green:"linear-gradient(90deg, rgba(68,240,127,1) 4.54%, rgba(114,248,176,1) 59.2%, rgba(153,202,255,1) 148.85%)",red:"linear-gradient(90deg, rgba(240,68,87,1) 4.54%, rgba(248,114,149,1) 59.2%, rgba(212,153,255,1) 148.85%)"},dark:{blue:"linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)",green:"linear-gradient(90deg, rgba(68,240,127,1) 4.54%, rgba(114,248,176,1) 59.2%, rgba(153,202,255,1) 148.85%)",red:"linear-gradient(90deg, rgba(240,68,87,1) 4.54%, rgba(248,114,149,1) 59.2%, rgba(212,153,255,1) 148.85%)"}},M={light:{accent:"0.7",accentSecondary:"0.15",accentSecondaryHover:"0.2",backgroundHide:"0.1",backgroundHideFallback:"0.5",foregroundSecondary:"0.05",foregroundSecondaryHover:"0.035",foregroundTertiary:"0.033",groupBorder:"0.075",border:"0.3",borderSecondary:"0.12",borderTertiary:"0.05",text:"0.8",textSecondary:"0.65",textSecondaryHover:"0.7",textTertiary:"0.4",textTertiaryHover:"0.5",textPlaceholder:"0.25"},dark:{accent:"0.66",accentSecondary:"0.2",accentSecondaryHover:"0.25",backgroundHide:"0.1",backgroundHideFallback:"0.5",foregroundSecondary:"0.1",foregroundSecondaryHover:"0.15",foregroundTertiary:"0.04",groupBorder:"0",border:"0.3",borderSecondary:"0.12",borderTertiary:"0.05",text:"0.7",textSecondary:"0.5",textSecondaryHover:"0.65",textTertiary:"0.35",textTertiaryHover:"0.4",textPlaceholder:"0.25"}},A={base:{black:"rgb(0, 0, 0)",white:"rgb(255, 255, 255)",current:"currentColor",inherit:"inherit",transparent:"transparent"},light:{accent:`${Se.light.blue}`,accentSecondary:`rgba(${V.light.blue}, ${M.light.accentSecondary})`,accentSecondaryHover:`rgba(${V.light.blue}, ${M.light.accentSecondary})`,accentTertiary:`rgba(${V.light.blue}, calc(${M.light.accentSecondary} * 0.5))`,accentText:`rgb(${L.light.background})`,accentGradient:Le.light.blue,background:`rgb(${L.light.background})`,backgroundHide:`rgba(${L.light.foreground}, ${M.light.backgroundHide})`,backgroundSecondary:`rgb(${L.light.backgroundSecondary})`,backgroundTertiary:`rgb(${L.light.backgroundTertiary})`,border:`rgb(${L.light.foreground}, ${M.light.border})`,borderSecondary:`rgb(${L.light.foreground}, ${M.light.borderSecondary})`,borderTertiary:`rgb(${L.light.foreground}, ${M.light.borderTertiary})`,foreground:`rgb(${L.light.foreground})`,foregroundSecondary:`rgba(${L.light.foreground}, ${M.light.foregroundSecondary})`,foregroundSecondaryHover:`rgba(${L.light.foreground}, ${M.light.foregroundSecondaryHover})`,foregroundTertiary:`rgba(${L.light.foreground}, ${M.light.foregroundTertiary})`,groupBackground:`rgb(${L.light.groupBackground})`,groupBorder:`rgb(${L.light.foreground})`,gradients:Le.light,text:`rgb(${L.light.foreground}, ${M.light.text})`,textPlaceholder:`rgb(${L.light.foreground}, ${M.light.textPlaceholder})`,textSecondary:`rgb(${L.light.foreground}, ${M.light.textSecondary})`,textTertiary:`rgb(${L.light.foreground}, ${M.light.textTertiary})`,...Se.light},dark:{accent:`${Se.dark.blue}`,accentSecondary:`rgba(${V.dark.blue}, ${M.dark.accentSecondary})`,accentSecondaryHover:`rgba(${V.dark.blue}, ${M.dark.accentSecondary})`,accentTertiary:`rgba(${V.dark.blue}, calc(${M.dark.accentSecondary} * 0.5))`,accentText:`rgb(${L.dark.background})`,accentGradient:Le.dark.blue,background:`rgb(${L.dark.background})`,backgroundHide:`rgba(${L.dark.foreground}, ${M.dark.backgroundHide})`,backgroundSecondary:`rgb(${L.dark.backgroundSecondary})`,backgroundTertiary:`rgb(${L.dark.backgroundTertiary})`,border:`rgb(${L.dark.foreground}, ${M.dark.border})`,borderSecondary:`rgb(${L.dark.foreground}, ${M.dark.borderSecondary})`,borderTertiary:`rgb(${L.dark.foreground}, ${M.dark.borderTertiary})`,foreground:`rgb(${L.dark.foreground})`,foregroundSecondary:`rgba(${L.dark.foreground}, ${M.dark.foregroundSecondary})`,foregroundSecondaryHover:`rgba(${L.dark.foreground}, ${M.dark.foregroundSecondaryHover})`,foregroundTertiary:`rgba(${L.dark.foreground}, ${M.dark.foregroundTertiary})`,groupBackground:`rgb(${L.dark.groupBackground})`,groupBorder:`rgb(${L.dark.foreground})`,gradients:Le.dark,text:`rgb(${L.dark.foreground}, ${M.dark.text})`,textPlaceholder:`rgb(${L.dark.foreground}, ${M.dark.textPlaceholder})`,textSecondary:`rgb(${L.dark.foreground}, ${M.dark.textSecondary})`,textTertiary:`rgb(${L.dark.foreground}, ${M.dark.textTertiary})`,...Se.dark}},Ut={0:"0",30:".3",50:".5",70:".7",100:"1"},qt={0:"0",px:"1px","0.25":"0.0625rem","0.5":"0.125rem","0.75":"0.1875rem",1:"0.25rem","1.25":"0.3125rem","1.5":"0.375rem","1.75":"0.4375rem",2:"0.5rem","2.5":"0.625rem",3:"0.75rem","3.5":"0.875rem",4:"1rem","4.5":"1.125rem",5:"1.25rem","5.5":"1.375rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem",11:"2.75rem",12:"3rem",13:"3.25rem",14:"3.5rem",15:"3.75rem",16:"4rem",18:"4.5rem",20:"5rem",24:"6rem",28:"7rem",32:"8rem",36:"9rem",40:"10rem",44:"11rem",48:"12rem",52:"13rem",56:"14rem",60:"15rem",64:"16rem",72:"18rem",80:"20rem",96:"24rem",112:"28rem",128:"32rem",144:"36rem",168:"42rem",192:"48rem",224:"56rem",256:"64rem",288:"72rem",320:"80rem","1/4":"25%","1/3":"33.333333%","1/2":"50%","2/3":"66.666667%","3/4":"75%",auto:"auto",full:"100%",fit:"fit-content",max:"max-content",min:"min-content",viewHeight:"100vh",viewWidth:"100vw",none:"0"},Xt={mono:'"iAWriter Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',sans:'"Satoshi", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'},Kt={headingOne:"3rem",headingTwo:"1.875rem",headingThree:"1.625rem",extraLarge:"1.3125rem",large:"1.125rem",small:"0.9375rem",label:"0.8125rem",base:"1.0625rem",root:"16px"},Jt={light:"300",normal:"400",medium:"500",semiBold:"550",bold:"650"},Qt={"-0.02":"-0.02em","-0.015":"-0.015em","-0.01":"-0.01em",normal:"0","0.03":"0.03em"},er={normal:"normal",none:"1","1.25":"1.25","1.375":"1.375","1.5":"1.5","1.625":"1.625",2:"2"},tr={75:"75ms",100:"100ms",150:"150ms",200:"200ms",300:"300ms",500:"500ms",700:"700ms",1e3:"1000ms"},rr={linear:"linear",in:"cubic-bezier(0.4, 0, 1, 1)",out:"cubic-bezier(0, 0, 0.2, 1)",inOut:"cubic-bezier(0.42, 0, 0.58, 1)",popIn:"cubic-bezier(0.15, 1.15, 0.6, 1)"},Ge={xs:360,sm:640,md:768,lg:1024,xl:1280},Do={light:{0:`${Z[0]} ${A.light.foregroundSecondary}`,"0.02":`${Z["0.02"]} ${A.light.foregroundSecondary}`,"0.25":`${Z["0.25"]} ${A.light.foregroundSecondary}`,"0.5":`${Z["0.5"]} ${A.light.foregroundSecondary}`,1:`${Z[1]} ${A.light.foregroundSecondary}`},dark:{0:`${Z[0]} ${A.dark.foregroundSecondary}`,"0.02":`${Z["0.02"]} ${A.dark.foregroundSecondary}`,"0.25":`${Z["0.25"]} ${A.dark.foregroundSecondary}`,"0.5":`${Z["0.5"]} ${A.dark.foregroundSecondary}`,1:`${Z[1]} ${A.dark.foregroundSecondary}`}},W={borderStyles:_t,borderWidths:Yt,colors:A,fonts:Xt,fontSizes:Kt,fontWeights:Jt,letterSpacings:Qt,lineHeights:er,opacity:Ut,radii:It,shades:M,shadows:Z,space:qt,breakpoints:Ge,transitionDuration:tr,transitionTimingFunction:rr,boxShadows:Do,accentsRaw:V,shadesRaw:L},Me={borderStyles:_t,borderWidths:Yt,colors:A.base,fonts:Xt,fontSizes:Kt,fontWeights:Jt,letterSpacings:Qt,lineHeights:er,opacity:Ut,radii:It,shadows:Z,space:qt,breakpoints:Ge,transitionDuration:tr,transitionTimingFunction:rr},Zo={...Me,colors:{...Me.colors,...W.colors.light},shades:W.shades.light,boxShadows:W.boxShadows.light,accentsRaw:W.accentsRaw.light,shadesRaw:W.shadesRaw.light,mode:"light"},Ao={...W,colors:{...Me.colors,...W.colors.dark},shades:W.shades.dark,boxShadows:W.boxShadows.dark,accentsRaw:W.accentsRaw.dark,shadesRaw:W.shadesRaw.dark,mode:"dark"},or={min:"min-width",max:"max-width"},Wo=Object.keys(Ge),No=Object.keys(or),oe=Wo.reduce((e,t)=>(e[t]=No.reduce((o,a)=>(o[a]=s=>n.css`
        @media (${or[a]}: ${Ge[t]}px) {
          ${s};
        }
      `,o),{}),e),{}),_o=d.default.div(({theme:e,$shadow:t})=>n.css`
    padding: ${e.space[6]};
    border-radius: ${e.radii["2xLarge"]};
    background-color: ${e.colors.background};
    ${oe.lg.min(n.css`
      border-radius: ${e.radii["3xLarge"]};
    `)}

    ${t&&e.mode==="light"&&n.css`
      box-shadow: 0px 0px ${e.radii["2xLarge"]} rgba(0, 0, 0, 0.1);
      border-radius: ${e.radii["2xLarge"]};
      ${oe.lg.min(n.css`
        box-shadow: 0px 0px ${e.radii["3xLarge"]} rgba(0, 0, 0, 0.1);
        border-radius: ${e.radii["3xLarge"]};
      `)}
    `}
  `),Ue=({children:e,shadow:t,...o})=>r.createElement(_o,{...o,$shadow:t},e);Ue.displayName="Card";const nr=(e,t,o,a)=>{const s=i=>{e.current&&!e.current.contains(i.target)&&o()};Ve.useEffect(()=>(a?document.addEventListener(t,s):document.removeEventListener(t,s),()=>{document.removeEventListener(t,s)}),[a])},Yo=(e,t,o,a,s)=>{const i=t.top-o.height-a-s,l=t.left-o.width-a-s,c=window.innerWidth-t.left-t.width-o.width-a-s,u=window.innerHeight-t.top-t.height-o.height-a-s;return e==="top"&&i<0&&u>i?"bottom":e==="right"&&c<0&&l>c?"left":e==="bottom"&&u<0&&i>u?"top":e==="left"&&l<0&&c>l?"right":e},Io=(e,t,o)=>({minX:-e.x+o,maxX:window.innerWidth-t.width-e.x-o,minY:-e.y+o,maxY:window.innerHeight-t.height-e.y-o}),Uo=(e,t,o,a,s,i=!0,l=!0)=>{const[c,u]=o.split("-"),g=e.width/2-t.width/2,w=e.height/2-t.height/2,h=["top","bottom"].includes(c)?"x":"y",v=h==="y"?"height":"width",m=e[v]/2-t[v]/2,x=i?Yo(c,e,t,a,s):c;let $;switch(x){case"top":$={x:g,y:-t.height-s};break;case"bottom":$={x:g,y:e.height+s};break;case"right":$={x:e.width+s,y:w};break;case"left":$={x:-t.width-s,y:w};break;default:$={x:e.x,y:e.y}}switch(u){case"start":$[h]-=m;break;case"end":$[h]+=m;break}if(l){const C=Io(e,t,a);switch(h){case"x":$.x=Math.min(Math.max($.x,C.minX),C.maxX);break;default:$.y=Math.min(Math.max($.y,C.minY),C.maxY);break}}return{...$,side:x}},qo=(e,t=!1)=>{let o="";return e==="top"?o="translate(0, 3em)":e==="right"?o="translate(-3em, 0)":e==="bottom"?o="translate(0, -3em)":o="translate(3em, 0);",t?`
      transform: translate(0, 0);
      opacity: 1;
      visibility: visible;
    `:`
    transform: ${o};
    opacity: 0;
    visibility: hidden;
  `},Xo=d.default.div(()=>n.css`
    position: relative;
    display: inline-block;
  `),Ko=d.default.div(({$injectedCSS:e,$x:t,$y:o})=>n.css`
    position: absolute;
    box-sizing: border-box;
    z-index: 20;
    visibility: hidden;
    opacity: 0;
    transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6);
    left: ${t}px;
    top: ${o}px;
    ${e&&n.css`
      ${e}
    `}
  `),ze=({popover:e,children:t,placement:o="top-center",offset:a=10,padding:s=20,flip:i=!0,shift:l=!0,animationFn:c,disabled:u=!1,open:g=!1,onDismiss:w})=>{const h=r.useMemo(()=>c?(y,b)=>c(y,b):(y,b)=>qo(y,b),[c]),[v,m]=r.useState({$x:0,$y:0,$side:void 0,$open:g,$injectedCSS:""}),x=r.useRef(null),$=r.useRef(null),C=r.useCallback((y,b)=>{const E=b.getBoundingClientRect(),p=y.getBoundingClientRect();return Uo(p,E,o,s,a,i,l)},[o,s,a,i,l]);return r.useEffect(()=>{if(x.current&&$.current&&h&&C){const y=!!g&&!u,{x:b,y:E,side:p}=C(x.current,$.current),k=h(p,y);m({$x:b,$y:E,$side:p,$open:g,$injectedCSS:k})}},[g,u,m,C,h]),nr(x,"click",()=>w&&w(),g),r.createElement(Xo,{"data-testid":"dynamicpopover",ref:x},t,r.createElement(Ko,{"data-testid":"dynamicpopover-popover",...v,ref:$},e))};ze.displayName="DynamicPopover";const Jo=typeof window!="undefined"?r.useLayoutEffect:r.useEffect,Ae={serverHandoffComplete:!1},Qo=()=>{const[e,t]=r.useState(Ae.serverHandoffComplete);return r.useEffect(()=>{e||t(!0)},[e]),r.useEffect(()=>{Ae.serverHandoffComplete||(Ae.serverHandoffComplete=!0)},[]),e},en="thorin";let tn=0;function Ct(){return++tn}const rn=()=>{const e=Qo(),[t,o]=r.useState(e?Ct:null);return Jo(()=>{t===null&&o(Ct())},[t]),t!=null?`${en}`+t:void 0},ar=({description:e,error:t,id:o}={})=>{const a=rn();return r.useMemo(()=>{const s=`${a}${o?`-${o}`:""}`,i=`${s}-label`;let l,c;e&&(c={id:`${s}-description`},l=c.id);let u;return t&&(u={id:`${s}-error`},l=`${l?`${l} `:""}${u.id}`),{content:{"aria-describedby":l,"aria-labelledby":i,id:s},description:c,error:u,label:{htmlFor:s,id:i}}},[a,e,t,o])},yt=r.createContext(void 0),on=d.default.label(({theme:e})=>n.css`
    color: ${e.colors.textTertiary};
    font-weight: ${e.fontWeights.semiBold};
    display: flex;
    cursor: pointer;
  `),nn=d.default.span(({theme:e})=>n.css`
    margin-left: ${e.space[4]};
  `),an=d.default.div(({theme:e,$inline:t})=>n.css`
    display: flex;
    align-items: flex-end;
    padding-left: ${t?"0":e.space[4]};
    padding-right: ${t?"0":e.space[4]};
    padding-top: 0;
    padding-bottom: 0;
  `),sn=d.default.span(({theme:e})=>n.css`
    color: ${e.colors.red};
    ::before {
      content: ' ';
      white-space: pre;
    }
  `),Re=({ids:e,label:t,labelSecondary:o,required:a,$inline:s,...i})=>r.createElement(an,{...i,...e.label,$inline:s},r.createElement(on,{...e.label,$inline:s},t," ",a&&r.createElement(r.Fragment,null,r.createElement(sn,null,"*"),r.createElement(X,null,"required"))),o&&r.createElement(nn,null,o)),vt=d.default.div(({theme:e,$inline:t,$width:o,$labelRight:a})=>n.css`
    display: flex;
    flex-direction: ${t?a?"row-reverse":"row":"column"};
    align-items: ${t?"center":"normal"};
    gap: ${t?e.space["2.5"]:e.space[2]};
    width: ${e.space[o]};
  `),ln=d.default.div(({theme:e})=>n.css`
    display: flex;
    flex-direction: column;
    gap: ${e.space[2]};
    flex: 1;
  `),We=d.default.div(({theme:e,$inline:t})=>n.css`
    padding: 0 ${t?"0":e.space[4]};
    color: ${e.colors.textSecondary};
  `),Ne=d.default.div(({theme:e,$inline:t})=>`
    color: ${e.colors.red};
    padding: 0 ${t?"0":e.space[4]};
`),xt=(e,t,o)=>typeof o=="string"?o:(o==null?void 0:o[e])||t,K=({children:e,description:t,error:o,hideLabel:a,id:s,label:i,labelSecondary:l,required:c,inline:u,width:g="full",labelRight:w=!1,labelPlacement:h,...v})=>{const m=ar({id:s,description:t!==void 0,error:o!==void 0});let x;typeof e=="function"?x=r.createElement(yt.Provider,{value:m},r.createElement(yt.Consumer,null,y=>e(y))):e?x=r.cloneElement(e,m.content):x=e;const $=xt("description","bottom",h),C=xt("error","bottom",h);return u?r.createElement(vt,{$inline:u,$labelRight:w,$width:g},r.createElement(ln,null,a?r.createElement(X,null,r.createElement(Re,{...v,ids:m,label:i,labelSecondary:l,required:c})):r.createElement(Re,{...v,ids:m,label:i,labelSecondary:l,required:c,$inline:u}),t&&r.createElement(We,{$inline:u},t),o&&r.createElement(Ne,{"aria-live":"polite",...m.error,$inline:u},o)),r.createElement("div",null,x)):r.createElement(vt,{$width:g},a?r.createElement(X,null,r.createElement(Re,{...v,ids:m,label:i,labelSecondary:l,required:c})):r.createElement(Re,{...v,ids:m,label:i,labelSecondary:l,required:c}),t&&$==="top"&&r.createElement(We,{...m.description},t),o&&C==="top"&&r.createElement(Ne,{"aria-live":"polite",...m.error},o),x,t&&$==="bottom"&&r.createElement(We,{...m.description},t),o&&C==="bottom"&&r.createElement(Ne,{"aria-live":"polite",...m.error},o))};K.displayName="Field";const cn=(e,t)=>{const o=t==null?void 0:t.split(", ");if(!o)return!0;const a=kt(e);return o.some(s=>{const i=kt(s);return i.type===a.type&&i.subtype===a.subtype})},kt=e=>{const t=e.split("/");return{type:t[0],subtype:t[1]}},Et={},qe=r.forwardRef(({accept:e,autoFocus:t,children:o,defaultValue:a,disabled:s,error:i,id:l,maxSize:c,name:u,required:g,tabIndex:w,onBlur:h,onChange:v,onError:m,onFocus:x,onReset:$,...C},y)=>{const b=r.useRef(null),E=y||b,[p,k]=r.useState(Et),P=i?!0:void 0,G=ar({id:l,error:P}),B=r.useCallback((S,T)=>{if(c&&S.size>c*1e6){T==null||T.preventDefault(),m&&m(`File is ${(S.size/1e6).toFixed(2)} MB. Must be smaller than ${c} MB`);return}k(O=>({...O,file:S,name:S.name,type:S.type})),v&&v(S)},[c,v,m]),z=r.useCallback(S=>{const T=S.target.files;!(T!=null&&T.length)||B(T[0],S)},[B]),j=r.useCallback(S=>{S.preventDefault(),k(T=>({...T,droppable:!0}))},[]),U=r.useCallback(S=>{S.preventDefault(),k(T=>({...T,droppable:!1}))},[]),ne=r.useCallback(S=>{S.preventDefault(),k(O=>({...O,droppable:!1}));let T;if(S.dataTransfer.items){const O=S.dataTransfer.items;if((O==null?void 0:O[0].kind)!=="file"||(T=O[0].getAsFile(),!T))return}else{const O=S.dataTransfer.files;if(!(O!=null&&O.length))return;T=O[0]}!cn(T.type,e)||B(T,S)},[B,e]),Q=r.useCallback(S=>{k(T=>({...T,focused:!0})),x&&x(S)},[x]),q=r.useCallback(S=>{k(T=>({...T,focused:!1})),h&&h(S)},[h]),de=r.useCallback(S=>{S.preventDefault(),k(Et),E.current&&(E.current.value=""),$&&$()},[E,$]);return r.useEffect(()=>{!a||k({previewUrl:a.url,name:a.name,type:a.type})},[]),r.useEffect(()=>{if(!p.file)return;const S=URL.createObjectURL(p.file);return k(T=>({...T,previewUrl:S})),()=>URL.revokeObjectURL(S)},[p.file]),r.createElement("div",null,r.createElement(X,null,r.createElement("input",{...C,...G.content,accept:e,"aria-invalid":P,autoFocus:t,disabled:s,name:u,ref:E,required:g,tabIndex:w,type:"file",onBlur:q,onChange:z,onFocus:Q})),r.createElement("label",{...G.label,onDragLeave:U,onDragOver:j,onDrop:ne},o({...p,reset:de})))});qe.displayName="FileInput";const dn=d.default.div(({theme:e,$textAlign:t,$textTransform:o,$level:a,$responsive:s,$color:i})=>n.css`
    ${t?n.css`
          text-align: ${t};
        `:""}
    ${o?n.css`
          text-transform: ${o};
        `:""}

  ${()=>{switch(a){case"1":return n.css`
            font-size: ${e.fontSizes.headingOne};
            font-weight: ${e.fontWeights.semiBold};
            letter-spacing: ${e.letterSpacings["-0.02"]};
            line-height: 4rem;
          `;case"2":return n.css`
            font-size: ${e.fontSizes.headingTwo};
            font-weight: ${e.fontWeights.semiBold};
            letter-spacing: ${e.letterSpacings["-0.02"]};
            line-height: 2.5rem;
          `;default:return""}}}
  
  ${()=>{if(s)switch(a){case"1":return n.css`
              font-size: ${e.fontSizes.headingTwo};
              ${oe.lg.min(n.css`
                font-size: ${e.fontSizes.headingOne};
              `)}
            `;case"2":return n.css`
              font-size: ${e.fontSizes.extraLarge};
              letter-spacing: normal;
              ${oe.sm.min(n.css`
                font-size: ${e.fontSizes.headingTwo};
                letter-spacing: -0.02;
              `)}
            `;default:return""}}}

  ${i&&n.css`
      color: ${e.colors[i]};
    `}
  
  font-family: ${e.fonts.sans};
  `),He=r.forwardRef(({align:e,children:t,as:o="h1",id:a,level:s="2",responsive:i,transform:l,color:c,...u},g)=>r.createElement(dn,{...u,$color:c,$level:s,$responsive:i,$textAlign:e,$textTransform:l,as:o,id:a,ref:g},t));He.displayName="Heading";const je=({children:e,className:t,el:o="div"})=>{const[a]=r.useState(document.createElement(o));return t&&a.classList.add(t),r.useEffect(()=>(document.body.appendChild(a),()=>{document.body.removeChild(a)}),[]),Ro.createPortal(e,a)};je.displayName="Portal";const un=d.default.div(({theme:e,$showTop:t,$showBottom:o})=>n.css`
    overflow: auto;
    position: relative;

    border-color: rgba(${e.shadesRaw.foreground}, 0.05);
    transition: border-color 0.15s ease-in-out;

    /* stylelint-disable-next-line selector-pseudo-element-no-unknown */
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: ${e.space["1.5"]};
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border: none;
      border-radius: ${e.radii.full};
      border-right-style: inset;
      border-right-width: calc(100vw + 100vh);
      border-color: inherit;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &:hover {
      border-color: rgba(${e.shadesRaw.foreground}, 0.2);
    }

    &::before,
    &::after {
      content: '';
      position: sticky;
      left: 0;
      width: 100%;
      display: block;
      height: ${e.space.px};
      background-color: rgba(${e.shadesRaw.foreground}, 0);
      transition: background-color 0.15s ease-in-out;
    }

    &::before {
      top: 0;
      ${t&&n.css`
        background-color: rgba(${e.shadesRaw.foreground}, 0.1);
      `}
    }
    &::after {
      bottom: 0;
      ${o&&n.css`
        background-color: rgba(${e.shadesRaw.foreground}, 0.1);
      `}
    }
  `),St=d.default.div(()=>n.css`
    display: block;
    height: 0px;
  `),sr=({topTriggerPx:e=16,bottomTriggerPx:t=16,onReachedTop:o,onReachedBottom:a,children:s,...i})=>{const l=r.useRef(null),c=r.useRef(null),u=r.useRef(null),g=r.useRef({onReachedTop:o,onReachedBottom:a}),[w,h]=r.useState(!1),[v,m]=r.useState(!1),x=$=>{var b,E,p,k;const C=[!1,-1],y=[!1,-1];for(let P=0;P<$.length;P+=1){const G=$[P],B=G.target===c.current?C:y;G.time>B[1]&&(B[0]=G.isIntersecting,B[1]=G.time)}C[1]!==-1&&h(!C[0]),y[1]!==-1&&m(!y[0]),C[0]&&((E=(b=g.current).onReachedTop)==null||E.call(b)),y[0]&&((k=(p=g.current).onReachedBottom)==null||k.call(p))};return r.useEffect(()=>{const $=l.current,C=c.current,y=u.current;let b;return $&&C&&y&&(b=new IntersectionObserver(x,{root:$,threshold:1,rootMargin:`${e}px 0px ${t}px 0px`}),b.observe(C),b.observe(y)),()=>{b.disconnect()}},[t,e]),r.useEffect(()=>{g.current={onReachedTop:o,onReachedBottom:a}},[o,a]),r.createElement(un,{$showBottom:v,$showTop:w,ref:l,...i},r.createElement(St,{"data-testid":"scrollbox-top-intersect",ref:c}),s,r.createElement(St,{"data-testid":"scrollbox-bottom-intersect",ref:u}))},ir=r.createContext(void 0),Xe=({children:e,loading:t})=>r.createElement(ir.Provider,{value:t},e);Xe.displayName="SkeletonGroup";const gn=d.default.div(({theme:e,$active:t})=>n.css`
    ${t&&n.css`
      background-color: ${e.colors.foregroundSecondary};
      border-radius: ${e.radii.medium};
      width: ${e.space.fit};
    `}
  `),pn=d.default.span(({$active:e})=>n.css`
    display: block;
    ${e?n.css`
          visibility: hidden;
        `:""}
  `),Ke=({as:e,children:t,loading:o,...a})=>{const s=r.useContext(ir),i=o!=null?o:s;return r.createElement(gn,{...a,$active:i,as:e},r.createElement(pn,{$active:i},t))};Ke.displayName="Skeleton";const fn=d.default.div(({theme:e,$hover:t,$size:o,$tone:a})=>n.css`
    line-height: normal;
    align-items: center;
    display: flex;
    border-radius: ${e.radii.full};
    font-weight: ${e.fontWeights.medium};
    width: ${e.space.max};

    ${t&&n.css`
      transition-duration: ${e.transitionDuration[150]};
      transition-property: color, border-color, background-color;
      transition-timing-function: ${e.transitionTimingFunction.inOut};
    `}

    ${()=>{switch(o){case"small":return n.css`
            height: ${e.space[5]};
            font-size: ${e.fontSizes.label};
          `;case"medium":return n.css`
            height: ${e.space[6]};
            font-size: ${e.fontSizes.small};
          `;default:return""}}}

  ${()=>{switch(a){case"accent":return n.css`
            color: ${e.colors.accent};
            background-color: ${e.colors.accentTertiary};
          `;case"secondary":return n.css`
            color: ${e.colors.textTertiary};
            background-color: ${e.colors.foregroundTertiary};
          `;case"blue":return n.css`
            color: ${e.colors.blue};
            background-color: rgba(
              ${e.accentsRaw.blue},
              calc(${e.shades.accentSecondary} * 0.5)
            );
          `;case"green":return n.css`
            color: ${e.colors.green};
            background-color: rgba(
              ${e.accentsRaw.green},
              calc(${e.shades.accentSecondary} * 0.5)
            );
          `;case"red":return n.css`
            color: ${e.colors.red};
            background-color: rgba(
              ${e.accentsRaw.red},
              calc(${e.shades.accentSecondary} * 0.5)
            );
          `;default:return""}}}
  
  ${()=>{if(t&&a==="accent")return n.css`
          background-color: ${e.colors.accentTertiary};

          &:hover,
          &:active {
            background-color: ${e.colors.accentSecondary};
          }
        `;if(t&&a==="secondary")return n.css`
          color: ${e.colors.textSecondary};
          background-color: ${e.colors.foregroundTertiary};

          &:hover,
          &:active {
            color: ${e.colors.text};
            background-color: ${e.colors.foregroundSecondary};
          }
        `;if(t&&a==="blue")return n.css`
          &:hover,
          &:active {
            background-color: ${e.colors.blue};
          }
        `;if(t&&a==="green")return n.css`
          &:hover,
          &:active {
            background-color: ${e.colors.green};
          }
        `;if(t&&a==="red")return n.css`
          &:hover,
          &:active {
            background-color: ${e.colors.red};
          }
        `}}
  `),bn=d.default.label(({theme:e})=>n.css`
    align-items: center;
    border-radius: ${e.radii.full};
    display: flex;
    height: ${e.space.full};
    padding: 0 ${e.space[2]};
    box-shadow: 0 0 0 2px ${e.colors.background};
  `),$n=d.default.div(({theme:e})=>n.css`
    padding: 0 ${e.space[2]};
  `),Oe=({as:e="div",children:t,hover:o,label:a,size:s="medium",tone:i="secondary",...l})=>r.createElement(fn,{...l,$hover:o,$size:s,$tone:i,as:e},a&&r.createElement(bn,null,r.createElement("span",null,a)),r.createElement($n,{as:e},t));Oe.displayName="Tag";const we=({children:e,surface:t,onDismiss:o,noBackground:a=!1,className:s="modal",open:i})=>{const[l,c]=Wt.useTransition({timeout:{enter:50,exit:300},mountOnEnter:!0,unmountOnExit:!0}),u=r.useRef(null),g=t||Ie,w=h=>h.target===u.current&&o&&o();return r.useEffect(()=>{c(i||!1);let h=0;return typeof window!="undefined"&&i&&(h=window.scrollY,document.body.style.width=`${document.body.clientWidth}px`,document.body.style.position="fixed",document.body.style.top=`-${h}px`),()=>{typeof window!="undefined"&&i&&(document.body.style.width="",document.body.style.position="",document.body.style.top="",window.scroll({top:h}))}},[i]),r.useEffect(()=>()=>{document.body.style.position="",document.body.style.top=""},[]),l!=="unmounted"?r.createElement(je,{className:s},o&&r.createElement(g,{$empty:a,$state:l,ref:u,onClick:w}),e({state:l})):null};we.displayName="Backdrop";const mn=(e="",t=10,o=5,a=5)=>e.length<t?e:`${e.slice(0,o)}...${e.slice(-a)}`,J=(e,t)=>e["data-testid"]?String(e["data-testid"]):t,lr=e=>t=>t[e==="small"?0:e==="large"?2:1],wn=(e,t)=>{if(Object.keys(e.colors.gradients).includes(t)){const o=t;return e.colors.gradients[o]}return e.colors[t]},hn=(e,{$size:t,$border:o,$color:a,$gradient:s})=>{const i=lr(t),l=i([e.space[12],e.space[12],e.space[20]]),c=i([e.space[6],e.space[6],e.space[10]]),u=i([e.space[7],e.space[8],e.space[12]]),g=i([e.space["3.5"],e.space[4],e.space[6]]),w=s?wn(e,a):e.colors[a],h=o?`calc(${u} - 2px)`:i([e.space[5],e.space[6],e.space[9]]),v=o?i(["1.25px","1.25px","1.75px"]):"1px",m=o?e.colors.border:e.colors.borderSecondary,x=o?"border-box":"content-box",$=o?"border-box":"content-box";return n.css`
    box-sizing: border-box;
    background: ${e.colors.foregroundSecondary};
    background-clip: content-box;
    width: ${l};
    height: ${u};
    border-radius: ${g};
    border-width: 1px;
    border-style: solid;
    border-color: ${e.colors.borderSecondary};
    transition: all 90ms ease-in-out;

    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }

    &:active {
      transform: translateY(0px);
      filter: brightness(1.1);
    }

    &:checked {
      background: ${w};
      background-clip: content-box;
      border-color: transparent;
    }

    &::before {
      content: '';
      border-width: ${v};
      border-style: solid;
      border-color: ${m};
      background-color: ${e.colors.background};
      background-clip: ${$};
      border-radius: ${e.radii.full};
      transform: translateX(-${c})
        translateX(${g});
      transition: all 90ms ease-in-out;
      box-sizing: ${x};
      width: ${h};
      height: ${h};
    }

    &:checked::before {
      transform: translateX(${c})
        translateX(-${g});
      border-color: ${o?m:"transparent"};
    }

    ${o&&n.css`
      &::after {
        content: '';
        display: block;
        position: absolute;
        background-color: ${m};
        width: ${i(["1.5px","1.5px","2px"])};
        border-radius: 2px;
        height: ${i(["9px","10px","16px"])};
        left: 50%;
        top: 50%;
        transform: translateX(-${c})
          translateX(${g}) translate(-50%, -50%);
        transition: all 90ms ease-in-out;
        z-index: 1;
      }

      &:checked::after {
        transform: translateX(${c})
          translateX(-${g}) translate(-50%, -50%);
      }
    `}
  `},Cn=(e,{$background:t,$size:o,$color:a,$border:s})=>{const i=lr(o),l=i([e.space[7],e.space[8],e.space[12]]),c=s?e.colors.borderSecondary:"transparent",u=i([e.space["3.5"],e.space[4],e.space[6]]);return n.css`
    width: ${l};
    height: ${l};
    border-width: 1px;
    border-color: ${c};
    border-radius: ${e.space[2]};
    background-color: ${e.colors[t]};
    background-clip: content-box;

    &:hover {
      transform: translateY(-1px);
      filter: contrast(0.7);
    }

    &:active {
      transform: translateY(0px);
      filter: contrast(1);
    }

    &::before {
      content: '';
      background-color: ${e.colors[a]};
      mask-image: ${`url('data:image/svg+xml; utf8, <svg width="${u}" height="${u}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.625L10.125 20.125L22 3.875" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>')`};
      width: ${u};
      height: ${u};
      transform: scale(0);
      transition: all 90ms ease-in-out;
    }

    &:checked::before {
      transform: scale(1);
    }
  `},yn=d.default.input(({theme:e,...t})=>n.css`
    font: inherit;
    display: grid;
    position: relative;
    place-content: center;
    transition: transform 150ms ease-in-out, filter 150ms ease-in-out;
    cursor: pointer;
    margin: ${e.space[1]} 0;

    ${()=>t.$variant==="switch"?hn(e,t):Cn(e,t)}
  `),Je=r.forwardRef(({description:e,disabled:t,error:o,hideLabel:a,id:s,label:i,labelSecondary:l,inline:c=!0,name:u,required:g,tabIndex:w,value:h,checked:v,width:m,onBlur:x,onChange:$,onFocus:C,variant:y="regular",color:b="blue",gradient:E=!1,background:p="grey",size:k="small",border:P=!1,...G},B)=>{const z=r.useRef(null),j=B||z;return r.createElement(K,{description:e,error:o,hideLabel:a,id:s,inline:c,label:i,labelSecondary:l,required:g,width:m},r.createElement(yn,{...G,"data-testid":J(G,"checkbox"),"aria-invalid":o?!0:void 0,type:"checkbox",$background:p,$border:P,$color:b,$gradient:E,$size:k,$variant:y,checked:v,disabled:t,name:u,ref:j,tabIndex:w,value:h,onBlur:x,onChange:$,onFocus:C}))});Je.displayName="Checkbox";const vn=d.default.div(()=>n.css`
    position: relative;
  `),xn=d.default.div(({theme:e,$disabled:t,$size:o})=>n.css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    color: ${e.colors.accent};

    ${t&&n.css`
      color: ${e.colors.textPlaceholder};
    `}

    ${()=>{switch(o){case"small":return n.css`
            height: ${e.space[16]};
            width: ${e.space[16]};
          `;case"large":return n.css`
            font-size: ${e.fontSizes.extraLarge};
            margin-top: -${e.space["0.5"]};
            height: ${e.space[24]};
            width: ${e.space[24]};
          `;default:return""}}}
  `),kn=d.default.div(({theme:e,$disabled:t,$size:o,$color:a})=>n.css`
    stroke: ${e.colors.accent};

    color: ${e.colors[a]};

    ${t&&n.css`
      color: ${e.colors.foregroundSecondary};
    `}

    ${()=>{switch(o){case"small":return n.css`
            height: ${e.space[16]};
            width: ${e.space[16]};
            stroke-width: ${e.space[1]};
          `;case"large":return n.css`
            height: ${e.space[24]};
            width: ${e.space[24]};
            stroke-width: ${e.space[1]};
          `;default:return""}}}
  `),En=d.default.circle(({$finished:e})=>n.css`
    transition: all 1s linear, stroke-width 0.2s ease-in-out 1s;

    ${e&&n.css`
      stroke-width: 0;
    `}
  `),Qe=r.forwardRef(({accessibilityLabel:e,color:t="textSecondary",size:o="small",countdownAmount:a,disabled:s,callback:i,...l},c)=>{const[u,g]=r.useState(0),[w,h]=r.useState(0);return r.useEffect(()=>{if(g(a),!s){h(a);const v=setInterval(()=>{h(m=>(m===1&&(clearInterval(v),i&&i()),m-1?m-1:0))},1e3);return()=>clearInterval(v)}},[i,a,s]),r.createElement(vn,{...l,"data-testid":J(l,"countdown-circle")},r.createElement(xn,{$size:o,$disabled:s},s?u:w),r.createElement(kn,{$color:t,$disabled:s,$size:o,ref:c},e&&r.createElement(X,null,e),r.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},r.createElement(En,{$finished:w===0,cx:"12",cy:"12",fill:"none",r:"9",strokeDasharray:`${48*(w/u)}, 56`,strokeLinecap:"round"}),r.createElement("circle",{cx:"12",cy:"12",fill:"none",opacity:s?"1":"0.25",r:"9",strokeLinecap:"round"}))))});Qe.displayName="CountdownCircle";const he=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M11.2552 17.8659C11.6526 18.3095 12.3474 18.3095 12.7448 17.8659L22.5063 6.97001C23.0833 6.32597 22.6262 5.30274 21.7615 5.30274H2.2385C1.37381 5.30274 0.916704 6.32597 1.49369 6.97001L11.2552 17.8659Z",fill:"currentColor"})),Sn=d.default.div(()=>n.css`
    max-width: max-content;
    position: relative;
  `),Ln=d.default.div(({theme:e,$opened:t,$inner:o,$shortThrow:a,$align:s,$labelAlign:i,$direction:l})=>n.css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;

    ${l==="up"&&n.css`
      bottom: 100%;
    `}

    ${i&&n.css`
      & > button {
        justify-content: ${i};
      }
    `}

    ${t?n.css`
          visibility: visible;
          opacity: 1;
        `:n.css`
          z-index: 1;
          visibility: hidden;
          opacity: 0;
        `}

    padding: ${e.space["1.5"]};
    background-color: ${e.colors.groupBackground};
    box-shadow: ${e.boxShadows["0.02"]};
    border-radius: ${e.radii["2xLarge"]};

    ${o&&n.css`
      background-color: ${e.colors.grey};
      border-radius: ${e.radii.almostExtraLarge};
      border-${l==="down"?"top":"bottom"}-left-radius: none;
      border-${l==="down"?"top":"bottom"}-right-radius: none;
      box-shadow: 0;
      border-width: ${e.space.px};
      border-${l==="down"?"top":"bottom"}-width: 0;
      border-color: ${e.colors.borderSecondary};
      padding: 0 ${e.space["1.5"]};
      padding-${l==="down"?"top":"bottom"}: ${e.space["2.5"]};
      padding-${l==="down"?"bottom":"top"}: ${e.space["1.5"]};
      margin-${l==="down"?"top":"bottom"}: -${e.space["2.5"]};
      transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6);
    `}

    ${()=>t?n.css`
          transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear,
            z-index 0s linear 0.35s;
        `:n.css`
        transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear,
          z-index 0s linear 0s;
      `}

    ${()=>{if(!t&&!a)return n.css`
          margin-${l==="down"?"top":"bottom"}: calc(-1 * ${e.space[12]});
        `;if(!t&&a)return n.css`
          margin-${l==="down"?"top":"bottom"}: calc(-1 * ${e.space["2.5"]});
        `;if(t&&!o)return n.css`
          z-index: 20;
          margin-${l==="down"?"top":"bottom"}: ${e.space["1.5"]};
        `}}

  ${s==="left"?n.css`
          left: 0;
        `:n.css`
          right: 0;
        `}
  `),Lt=d.default.button(({theme:e,$inner:t,$hasColor:o,$color:a,disabled:s})=>n.css`
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: ${e.space[4]};
    width: ${e.space.full};
    height: ${e.space[12]};
    padding: ${e.space[3]};
    font-weight: ${e.fontWeights.semiBold};
    transition-duration: 0.15s;
    transition-property: color, transform, filter;
    transition-timing-function: ease-in-out;
    letter-spacing: -0.01em;

    &:active {
      transform: translateY(0px);
      filter: brightness(1);
    }

    color: ${e.colors[a||"accent"]};

    ${s&&n.css`
      color: ${e.colors.textTertiary};
      cursor: not-allowed;
    `}

    ${()=>{if(t)return n.css`
          justify-content: center;

          &:hover {
            color: ${e.colors.accent};
          }
        `;if(!t)return n.css`
          justify-content: flex-start;

          &:hover {
            transform: translateY(-1px);
            filter: brightness(1.05);
          }
        `}}

    ${()=>{if(t&&!o)return n.css`
          color: ${e.colors.textSecondary};
        `}}
  `),Rn=({setIsOpen:e,item:t})=>{const o=r.useRef(null),a=r.cloneElement(t,{...t.props,ref:o}),s=r.useCallback(()=>{e(!1)},[e]);return r.useEffect(()=>{const i=o.current;return i==null||i.addEventListener("click",s),()=>{i==null||i.removeEventListener("click",s)}},[s,t]),a},Tn=({items:e,setIsOpen:t,isOpen:o,width:a,inner:s,align:i,shortThrow:l,keepMenuOnTop:c,labelAlign:u,direction:g})=>r.createElement(Ln,{$opened:o,$inner:s,$align:i,$shortThrow:l,$labelAlign:u,$direction:g,style:{width:s||a&&parseInt(a)>100?`${a}px`:"150px",zIndex:c?100:void 0}},e.map(w=>{if(r.isValidElement(w))return Rn({item:w,setIsOpen:t});const{color:h,value:v,label:m,onClick:x,disabled:$,as:C,wrapper:y}=w,b={$inner:s,$hasColor:!!h,$color:h,disabled:$,onClick:()=>{t(!1),x==null||x(v)},as:C,children:m};return y?y(r.createElement(Lt,{...b,type:"button"}),v||m):r.createElement(Lt,{...b,key:v||m,type:"button"})})),Vn=d.default.button(({theme:e,$size:t,$open:o,$direction:a})=>n.css`
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${e.space[4]};
    border-width: ${e.space.px};
    font-weight: ${e.fontWeights.semiBold};
    cursor: pointer;
    position: relative;
    border-color: ${e.colors.borderSecondary};

    ${()=>{switch(t){case"small":return n.css`
            padding: ${e.space["0.5"]} ${e.space["0.25"]};
          `;case"medium":return n.css`
            padding: ${e.space["2.5"]} ${e.space["3.5"]};
          `;default:return""}}}

    ${()=>{if(o)return n.css`
          border-${a==="down"?"top":"bottom"}-left-radius: ${e.radii.almostExtraLarge};
          border-${a==="down"?"top":"bottom"}-right-radius: ${e.radii.almostExtraLarge};
          border-${a==="down"?"bottom":"top"}-left-radius: none;
          border-${a==="down"?"bottom":"top"}-right-radius: none;
          border-${a==="down"?"bottom":"top"}-width: 0;
          background-color: ${e.colors.grey};
          color: ${e.colors.textTertiary};
          transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6),
            0.3s color ease-in-out, 0.2s border-radius ease-in-out,
            0s border-width 0.1s, 0s padding linear;

          &:hover {
            color: ${e.colors.accent};
          }
        `;if(!o)return n.css`
          background-color: ${e.colors.background};
          color: ${e.colors.textSecondary};
          border-radius: ${e.radii.almostExtraLarge};
          box-shadow: ${e.boxShadows["0.02"]};
          transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6),
            0.15s color ease-in-out, 0s border-width 0.15s,
            0.15s border-color ease-in-out, 0s padding linear;

          &:hover {
            border-color: ${e.colors.border};
          }
        `}}
  `),Rt=d.default(he)(({theme:e,$open:t,$direction:o})=>n.css`
    margin-left: ${e.space[1]};
    width: ${e.space[3]};
    margin-right: ${e.space["0.5"]};
    transition-duration: ${e.transitionDuration[200]};
    transition-property: all;
    transition-timing-function: ${e.transitionTimingFunction.inOut};
    opacity: 0.3;
    transform: rotate(${o==="down"?"0deg":"180deg"});
    display: flex;

    & > svg {
      fill: currentColor;
    }
    fill: currentColor;

    ${t&&n.css`
      opacity: 1;
      transform: rotate(${o==="down"?"180deg":"0deg"});
    `}
  `),Mn=d.default.div(()=>n.css`
    z-index: 10;
    position: relative;
  `),Fe=({children:e,buttonProps:t,items:o=[],inner:a=!1,chevron:s=!0,align:i="left",menuLabelAlign:l,shortThrow:c=!1,keepMenuOnTop:u=!1,size:g="medium",label:w,direction:h="down",isOpen:v,setIsOpen:m,...x})=>{const $=r.useRef(),[C,y]=r.useState(!1),[b,E]=m?[v,m]:[C,y],p=k=>{$.current&&!$.current.contains(k.target)&&E(!1)};return r.useEffect(()=>(b?document.addEventListener("mousedown",p):document.removeEventListener("mousedown",p),()=>{document.removeEventListener("mousedown",p)}),[$,b]),r.createElement(Sn,{ref:$,...x,"data-testid":J(x,"dropdown")},!e&&a&&r.createElement(Vn,{$direction:h,$open:b,$size:g,type:"button",onClick:()=>E(!b)},w,s&&r.createElement(Rt,{$direction:h,$open:b})),!e&&!a&&r.createElement(Mn,null,r.createElement(Be,{...t,pressed:b,suffix:s&&r.createElement(Rt,{$direction:h,$open:b}),onClick:()=>E(!b)},w)),r.Children.map(e,k=>{if(r.isValidElement(k))return r.cloneElement(k,{...t,zindex:10,onClick:()=>E(!b)})}),r.createElement(Tn,{align:i,direction:h,inner:a,isOpen:b,items:o,keepMenuOnTop:u,labelAlign:l,setIsOpen:E,shortThrow:c,width:$.current&&$.current.getBoundingClientRect().width.toFixed(2)}))};Fe.displayName="Dropdown";const Pn=d.default.fieldset(({theme:e})=>n.css`
    display: flex;
    flex-direction: column;
    gap: ${e.space[4]};
  `),Bn=d.default.div(({theme:e})=>n.css`
    display: flex;
    flex-direction: column;
    gap: ${e.space[1]};
    padding: 0 ${e.space[4]};
  `),Gn=d.default.div(({theme:e})=>n.css`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: ${e.space[3]};
  `),zn=d.default.div(({theme:e})=>n.css`
    color: ${e.colors.textSecondary};
    font-size: ${e.fontSizes.base};
  `),Hn=d.default.div(({theme:e})=>n.css`
    display: flex;
    flex-direction: column;
    gap: ${e.space[4]};
  `),et=({children:e,description:t,disabled:o,form:a,legend:s,name:i,status:l,...c})=>{let u,g;switch(l){case"complete":{u="Complete",g="green";break}case"required":case"pending":{u=l==="pending"?"Pending":"Required",g="accent";break}case"optional":{u="Optional",g="secondary";break}}return typeof l=="object"&&(u=l.name,g=l.tone),r.createElement(Pn,{...c,disabled:o,form:a,name:i},r.createElement(Bn,null,r.createElement(Gn,null,r.createElement(He,{as:"legend",level:"2",responsive:!0},s),g&&u&&r.createElement(Oe,{tone:g},u)),r.createElement(zn,null,t)),r.createElement(Hn,null,e))};et.displayName="FieldSet";const tt=({title:e,titleId:t,...o})=>r.createElement("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M8.67189 2.89631C10.1562 0.367896 13.8438 0.367896 15.3281 2.89631L23.4693 16.7715C24.9833 19.3505 23.0661 22.5 20.1412 22.5H3.85878C0.934016 22.5 -0.983164 19.3507 0.530497 16.7718L8.67189 2.89631ZM11.2575 4.41565L3.11646 18.2906C2.82077 18.7942 3.1643 19.5 3.85878 19.5H20.1412C20.8357 19.5 21.1794 18.7945 20.8837 18.2909L12.7425 4.41565C12.4171 3.86186 11.5829 3.86186 11.2575 4.41565ZM12 7.93732C12.828 7.93732 13.4993 8.60889 13.4993 9.43732V11.7499C13.4993 12.5783 12.828 13.2499 12 13.2499C11.172 13.2499 10.5007 12.5783 10.5007 11.7499V9.43732C10.5007 8.60889 11.172 7.93732 12 7.93732ZM10.5007 16.3749C10.5007 15.5465 11.172 14.8749 12 14.8749H12.0118C12.8398 14.8749 13.511 15.5465 13.511 16.3749C13.511 17.2034 12.8398 17.8749 12.0118 17.8749H12C11.172 17.8749 10.5007 17.2034 10.5007 16.3749Z",fill:"currentColor"})),cr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM17.5605 10.9395L13.0605 6.4395C12.7776 6.16626 12.3987 6.01507 12.0054 6.01849C11.6121 6.02191 11.2359 6.17966 10.9578 6.45777C10.6797 6.73588 10.5219 7.1121 10.5185 7.5054C10.5151 7.89869 10.6663 8.2776 10.9395 8.5605L12.879 10.5H7.5C7.10218 10.5 6.72064 10.658 6.43934 10.9393C6.15804 11.2206 6 11.6022 6 12C6 12.3978 6.15804 12.7794 6.43934 13.0607C6.72064 13.342 7.10218 13.5 7.5 13.5H12.879L10.9395 15.4395C10.7962 15.5779 10.682 15.7434 10.6033 15.9264C10.5247 16.1094 10.4834 16.3062 10.4816 16.5054C10.4799 16.7046 10.5178 16.9021 10.5933 17.0864C10.6687 17.2708 10.7801 17.4383 10.9209 17.5791C11.0617 17.7199 11.2292 17.8313 11.4136 17.9067C11.5979 17.9822 11.7954 18.0201 11.9946 18.0184C12.1938 18.0166 12.3906 17.9753 12.5736 17.8967C12.7566 17.818 12.9221 17.7038 13.0605 17.5605L17.5605 13.0605C17.8417 12.7792 17.9997 12.3977 17.9997 12C17.9997 11.6023 17.8417 11.2208 17.5605 10.9395Z",fill:"currentColor"})),dr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14 5l7 7m0 0l-7 7m7-7H3"})),ur=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 10l7-7m0 0l7 7m-7-7v18"})),gr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})),pr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM10.0605 7.9395C9.7776 7.66626 9.39869 7.51507 9.0054 7.51849C8.6121 7.52191 8.23588 7.67966 7.95777 7.95777C7.67966 8.23588 7.52191 8.6121 7.51849 9.0054C7.51507 9.39869 7.66626 9.7776 7.9395 10.0605L9.879 12L7.9395 13.9395C7.79624 14.0779 7.68196 14.2434 7.60335 14.4264C7.52473 14.6094 7.48336 14.8062 7.48162 15.0054C7.47989 15.2046 7.51785 15.4021 7.59327 15.5864C7.66869 15.7708 7.78007 15.9383 7.92091 16.0791C8.06175 16.2199 8.22922 16.3313 8.41357 16.4067C8.59791 16.4822 8.79543 16.5201 8.9946 16.5184C9.19377 16.5166 9.3906 16.4753 9.57361 16.3967C9.75661 16.318 9.92213 16.2038 10.0605 16.0605L12 14.121L13.9395 16.0605C14.2224 16.3337 14.6013 16.4849 14.9946 16.4815C15.3879 16.4781 15.7641 16.3203 16.0422 16.0422C16.3203 15.7641 16.4781 15.3879 16.4815 14.9946C16.4849 14.6013 16.3337 14.2224 16.0605 13.9395L14.121 12L16.0605 10.0605C16.3337 9.7776 16.4849 9.39869 16.4815 9.0054C16.4781 8.6121 16.3203 8.23588 16.0422 7.95777C15.7641 7.67966 15.3879 7.52191 14.9946 7.51849C14.6013 7.51507 14.2224 7.66626 13.9395 7.9395L12 9.879L10.0605 7.9395Z",fill:"currentColor"})),fr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M2 12.625L10.125 20.125L22 3.875",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"})),br=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})),$r=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 19l-7-7 7-7"})),mr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 5l7 7-7 7"})),wr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 15l7-7 7 7"})),rt=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0.584985 0.610577C0.959663 0.235635 1.46777 0.0250036 1.99756 0.0250036C2.52736 0.0250036 3.03546 0.235635 3.41014 0.610577L11.9875 9.19658L20.5649 0.610577C20.7492 0.419556 20.9697 0.267192 21.2134 0.162374C21.4572 0.0575557 21.7194 0.00238315 21.9846 7.55141e-05C22.2499 -0.00223212 22.513 0.0483709 22.7586 0.148933C23.0041 0.249494 23.2272 0.398001 23.4148 0.585786C23.6024 0.773571 23.7508 0.996876 23.8512 1.24267C23.9517 1.48846 24.0022 1.75182 23.9999 2.01738C23.9976 2.28294 23.9425 2.54538 23.8378 2.78938C23.7331 3.03339 23.5809 3.25408 23.39 3.43858L14.8127 12.0246L23.39 20.6106C23.754 20.9878 23.9554 21.493 23.9508 22.0174C23.9463 22.5418 23.7361 23.0434 23.3657 23.4142C22.9953 23.785 22.4941 23.9954 21.9703 23.9999C21.4464 24.0045 20.9417 23.8029 20.5649 23.4386L11.9875 14.8526L3.41014 23.4386C3.03332 23.8029 2.52862 24.0045 2.00475 23.9999C1.48089 23.9954 0.979766 23.785 0.609323 23.4142C0.238879 23.0434 0.0287522 22.5418 0.0241999 22.0174C0.0196477 21.493 0.221035 20.9878 0.584985 20.6106L9.16235 12.0246L0.584985 3.43858C0.210419 3.06352 0 2.5549 0 2.02458C0 1.49425 0.210419 0.985632 0.584985 0.610577V0.610577Z",fill:"currentColor"})),hr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"})),Cr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})),yr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"})),vr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M6.85715 10.2857C6.85715 9.3764 7.21837 8.50433 7.86135 7.86135C8.50433 7.21837 9.3764 6.85715 10.2857 6.85715H20.5714C21.4807 6.85715 22.3528 7.21837 22.9958 7.86135C23.6388 8.50433 24 9.3764 24 10.2857V20.5714C24 21.4807 23.6388 22.3528 22.9958 22.9958C22.3528 23.6388 21.4807 24 20.5714 24H10.2857C9.3764 24 8.50433 23.6388 7.86135 22.9958C7.21837 22.3528 6.85715 21.4807 6.85715 20.5714V10.2857Z",fill:"currentColor"}),r.createElement("path",{d:"M3.42857 0C2.51926 0 1.64719 0.361223 1.00421 1.00421C0.361223 1.64719 0 2.51926 0 3.42857V13.7143C0 14.6236 0.361223 15.4957 1.00421 16.1387C1.64719 16.7816 2.51926 17.1429 3.42857 17.1429V6.42857C3.42857 4.77172 4.77172 3.42857 6.42857 3.42857H17.1429C17.1429 2.51926 16.7816 1.64719 16.1387 1.00421C15.4957 0.361223 14.6236 0 13.7143 0H3.42857Z",fill:"currentColor"})),xr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"})),kr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"})),Er=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})),Sr=({title:e,titleId:t,...o})=>r.createElement("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.41439 13.6844L12.0452 21.7082C12.1448 21.8501 12.3551 21.8501 12.4546 21.7081L18.0764 13.6884L12.4479 16.1153L12.25 16.2007L12.052 16.1153L6.41439 13.6844ZM6.12744 12.4717L12.25 15.1117L18.3441 12.4839L12.4655 2.37075C12.3693 2.20517 12.1302 2.20487 12.0336 2.3702L6.12744 12.4717Z",fill:"currentColor"})),Lr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M11.998 0V8.87185L19.4236 12.2225L11.998 0Z",fill:"currentColor",fillOpacity:.8}),r.createElement("path",{d:"M11.998 0L4.57143 12.2225L11.998 8.87185V0Z",fill:"currentColor",fillOpacity:.4}),r.createElement("path",{d:"M11.998 17.9717V24L19.4286 13.6188L11.998 17.9717Z",fill:"currentColor",fillOpacity:.8}),r.createElement("path",{d:"M11.998 24V17.9707L4.57143 13.6188L11.998 24Z",fill:"currentColor",fillOpacity:.4}),r.createElement("path",{d:"M11.998 16.5765L19.4236 12.2226L11.998 8.87386V16.5765Z",fill:"currentColor"}),r.createElement("path",{d:"M4.57143 12.2226L11.998 16.5765V8.87386L4.57143 12.2226Z",fill:"currentColor",fillOpacity:.8})),Rr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M11.998 0V8.87185L19.4236 12.2225L11.998 0Z",fill:"currentColor",fillOpacity:.602}),r.createElement("path",{d:"M11.998 0L4.57143 12.2225L11.998 8.87185V0Z",fill:"currentColor"}),r.createElement("path",{d:"M11.998 17.9717V24L19.4286 13.6188L11.998 17.9717Z",fill:"currentColor",fillOpacity:.602}),r.createElement("path",{d:"M11.998 24V17.9707L4.57143 13.6188L11.998 24Z",fill:"currentColor"}),r.createElement("path",{d:"M11.998 16.5765L19.4236 12.2226L11.998 8.87386V16.5765Z",fill:"currentColor",fillOpacity:.2}),r.createElement("path",{d:"M4.57143 12.2226L11.998 16.5765V8.87386L4.57143 12.2226Z",fill:"currentColor",fillOpacity:.602})),Tr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})),Ce=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("rect",{width:24,height:24,rx:12,fill:"currentColor",fillOpacity:.15}),r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.15726 7.17299C7.31622 7.01408 7.53178 6.92481 7.75654 6.92481C7.9813 6.92481 8.19686 7.01408 8.35581 7.17299L11.9947 10.8119L15.6336 7.17299C15.7118 7.09203 15.8053 7.02746 15.9087 6.98303C16.0121 6.93861 16.1234 6.91523 16.2359 6.91425C16.3485 6.91327 16.4601 6.93472 16.5642 6.97734C16.6684 7.01995 16.7631 7.08289 16.8426 7.16248C16.9222 7.24207 16.9852 7.33671 17.0278 7.44088C17.0704 7.54505 17.0919 7.65666 17.0909 7.76921C17.0899 7.88176 17.0665 7.99299 17.0221 8.0964C16.9777 8.19982 16.9131 8.29335 16.8321 8.37154L13.1932 12.0104L16.8321 15.6493C16.9865 15.8092 17.072 16.0233 17.07 16.2455C17.0681 16.4678 16.979 16.6804 16.8218 16.8375C16.6647 16.9947 16.4521 17.0838 16.2298 17.0858C16.0076 17.0877 15.7934 17.0023 15.6336 16.8479L11.9947 13.209L8.35581 16.8479C8.19595 17.0023 7.98184 17.0877 7.75959 17.0858C7.53734 17.0838 7.32475 16.9947 7.16759 16.8375C7.01043 16.6804 6.92129 16.4678 6.91935 16.2455C6.91742 16.0233 7.00286 15.8092 7.15726 15.6493L10.7961 12.0104L7.15726 8.37154C6.99836 8.21258 6.90909 7.99702 6.90909 7.77226C6.90909 7.5475 6.99836 7.33194 7.15726 7.17299V7.17299Z",fill:"currentColor"})),Vr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"})),Mr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("g",{clipPath:"url(#clip0_3998_6392)"},r.createElement("path",{d:"M7.05947 19.9737C7.25483 20.0776 7.46091 19.8527 7.3413 19.6665C6.69208 18.6561 6.07731 16.9559 7.05679 14.7661C8.69019 11.1146 9.68411 9.22335 9.68411 9.22335C9.68411 9.22335 10.2128 11.4304 11.6458 13.3928C13.0251 15.2815 13.78 17.6568 12.563 19.6356C12.4488 19.8213 12.6502 20.0404 12.8442 19.9411C14.3508 19.1705 16.0405 17.6246 16.2312 14.5484C16.3015 13.6084 16.1961 12.2924 15.6689 10.6317C14.9911 8.52692 14.1578 7.54479 13.6757 7.12302C13.5315 6.99685 13.3072 7.10868 13.319 7.29992C13.4595 9.57097 12.6051 10.1473 12.1188 8.84848C11.9246 8.32973 11.8113 7.43247 11.8113 6.33979C11.8113 4.52067 11.2836 2.64805 10.12 1.12635C9.81741 0.730628 9.46336 0.360856 9.05715 0.0455287C8.91009 -0.0686545 8.69692 0.0461169 8.71038 0.231804C8.79973 1.46501 8.71878 4.9993 5.61809 9.22165C2.80668 13.1384 3.8961 16.1464 4.28267 16.9611C5.02175 18.5218 6.05267 19.4384 7.05947 19.9737Z",fill:"currentColor",fillOpacity:.4})),r.createElement("defs",null,r.createElement("clipPath",{id:"clip0_3998_6392"},r.createElement("rect",{width:20,height:20,fill:"white"})))),Pr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("g",{clipPath:"url(#clip0_3998_6392)"},r.createElement("path",{d:"M7.05947 19.9737C7.25483 20.0776 7.46091 19.8527 7.3413 19.6665C6.69208 18.6561 6.07731 16.9559 7.05679 14.7661C8.69019 11.1146 9.68411 9.22335 9.68411 9.22335C9.68411 9.22335 10.2128 11.4304 11.6458 13.3928C13.0251 15.2815 13.78 17.6568 12.563 19.6356C12.4488 19.8213 12.6502 20.0404 12.8442 19.9411C14.3508 19.1705 16.0405 17.6246 16.2312 14.5484C16.3015 13.6084 16.1961 12.2924 15.6689 10.6317C14.9911 8.52692 14.1578 7.54479 13.6757 7.12302C13.5315 6.99685 13.3072 7.10868 13.319 7.29992C13.4595 9.57097 12.6051 10.1473 12.1188 8.84848C11.9246 8.32973 11.8113 7.43247 11.8113 6.33979C11.8113 4.52067 11.2836 2.64805 10.12 1.12635C9.81741 0.730628 9.46336 0.360856 9.05715 0.0455287C8.91009 -0.0686545 8.69692 0.0461169 8.71038 0.231804C8.79973 1.46501 8.71878 4.9993 5.61809 9.22165C2.80668 13.1384 3.8961 16.1464 4.28267 16.9611C5.02175 18.5218 6.05267 19.4384 7.05947 19.9737Z",fill:"currentColor",fillOpacity:1})),r.createElement("defs",null,r.createElement("clipPath",{id:"clip0_3998_6392"},r.createElement("rect",{width:20,height:20,fill:"white"})))),Br=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("rect",{width:24,height:24,fill:"url(#paint0_linear_2_3)"}),r.createElement("defs",null,r.createElement("linearGradient",{id:"paint0_linear_2_3",x1:15.986,y1:26.8444,x2:-7.34084,y2:-14.214,gradientUnits:"userSpaceOnUse"},r.createElement("stop",{stopColor:"#44BCF0"}),r.createElement("stop",{offset:.378795,stopColor:"#7298F8"}),r.createElement("stop",{offset:1,stopColor:"#A099FF"})))),Gr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"})),zr=({title:e,titleId:t,...o})=>r.createElement("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M4.85714 2C4.09938 2 3.37266 2.30102 2.83684 2.83684C2.30102 3.37266 2 4.09938 2 4.85714V7.71429C2 8.47205 2.30102 9.19877 2.83684 9.73459C3.37266 10.2704 4.09938 10.5714 4.85714 10.5714H7.71429C8.47205 10.5714 9.19877 10.2704 9.73459 9.73459C10.2704 9.19877 10.5714 8.47205 10.5714 7.71429V4.85714C10.5714 4.09938 10.2704 3.37266 9.73459 2.83684C9.19877 2.30102 8.47205 2 7.71429 2H4.85714ZM4.85714 13.4286C4.09938 13.4286 3.37266 13.7296 2.83684 14.2654C2.30102 14.8012 2 15.528 2 16.2857V19.1429C2 19.9006 2.30102 20.6273 2.83684 21.1632C3.37266 21.699 4.09938 22 4.85714 22H7.71429C8.47205 22 9.19877 21.699 9.73459 21.1632C10.2704 20.6273 10.5714 19.9006 10.5714 19.1429V16.2857C10.5714 15.528 10.2704 14.8012 9.73459 14.2654C9.19877 13.7296 8.47205 13.4286 7.71429 13.4286H4.85714ZM13.4286 4.85714C13.4286 4.09938 13.7296 3.37266 14.2654 2.83684C14.8012 2.30102 15.528 2 16.2857 2H19.1429C19.9006 2 20.6273 2.30102 21.1632 2.83684C21.699 3.37266 22 4.09938 22 4.85714V7.71429C22 8.47205 21.699 9.19877 21.1632 9.73459C20.6273 10.2704 19.9006 10.5714 19.1429 10.5714H16.2857C15.528 10.5714 14.8012 10.2704 14.2654 9.73459C13.7296 9.19877 13.4286 8.47205 13.4286 7.71429V4.85714ZM13.4286 16.2857C13.4286 15.528 13.7296 14.8012 14.2654 14.2654C14.8012 13.7296 15.528 13.4286 16.2857 13.4286H19.1429C19.9006 13.4286 20.6273 13.7296 21.1632 14.2654C21.699 14.8012 22 15.528 22 16.2857V19.1429C22 19.9006 21.699 20.6273 21.1632 21.1632C20.6273 21.699 19.9006 22 19.1429 22H16.2857C15.528 22 14.8012 21.699 14.2654 21.1632C13.7296 20.6273 13.4286 19.9006 13.4286 19.1429V16.2857Z",fill:"currentColor"})),Hr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"})),ot=({title:e,titleId:t,...o})=>r.createElement("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M12 5.25C12.8284 5.25 13.5 5.92157 13.5 6.75V6.75583C13.5 7.58426 12.8284 8.25583 12 8.25583C11.1716 8.25583 10.5 7.58426 10.5 6.75583V6.75C10.5 5.92157 11.1716 5.25 12 5.25Z",fill:"currentColor"}),r.createElement("path",{d:"M10.5 9.5C9.67157 9.5 9 10.1716 9 11C9 11.8284 9.67157 12.5 10.5 12.5V17C10.5 17.8284 11.1716 18.5 12 18.5C12.8284 18.5 13.5 17.8284 13.5 17L13.5 11C13.5 10.1716 12.8284 9.5 12 9.5H10.5Z",fill:"currentColor"}),r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",fill:"currentColor"})),jr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})),Or=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 6h16M4 10h16M4 14h16M4 18h16"})),Fr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})),Dr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M4.00058 9.70969C4.23776 10.2167 4.82477 11.2188 4.82477 11.2188L11.611 0L4.98783 4.62508C4.59318 4.88836 4.2694 5.24473 4.04505 5.66275C3.7434 6.29338 3.58313 6.98229 3.57545 7.68131C3.56777 8.38033 3.71286 9.07259 4.00058 9.70969Z",fill:"#5298FF"}),r.createElement("path",{d:"M1.31159 13.4038C1.38637 14.477 1.68956 15.5217 2.20086 16.4682C2.71216 17.4146 3.41976 18.2409 4.27629 18.8917L11.6021 24C11.6021 24 7.01863 17.3944 3.15267 10.8215C2.76128 10.1271 2.49816 9.36782 2.37592 8.58011C2.3218 8.22341 2.3218 7.86059 2.37592 7.50389C2.27512 7.69068 2.07945 8.07313 2.07945 8.07313C1.68745 8.87262 1.42049 9.72754 1.28787 10.608C1.21154 11.5388 1.21948 12.4745 1.31159 13.4038Z",fill:"#5298FF"}),r.createElement("path",{d:"M20.0011 14.2903C19.7639 13.7833 19.1769 12.7812 19.1769 12.7812L12.3907 24L19.0138 19.3779C19.4085 19.1146 19.7322 18.7582 19.9566 18.3402C20.2587 17.7092 20.4192 17.0198 20.4269 16.3202C20.4346 15.6206 20.2892 14.9278 20.0011 14.2903Z",fill:"#5298FF"}),r.createElement("path",{d:"M22.69 10.5962C22.6153 9.52304 22.3121 8.47827 21.8008 7.53183C21.2895 6.58539 20.5819 5.75911 19.7253 5.10834L12.3996 0C12.3996 0 16.98 6.60556 20.849 13.1785C21.2393 13.8731 21.5014 14.6324 21.6227 15.4199C21.6769 15.7766 21.6769 16.1394 21.6227 16.4961C21.7235 16.3093 21.9192 15.9269 21.9192 15.9269C22.3112 15.1274 22.5782 14.2725 22.7108 13.392C22.7881 12.4613 22.7812 11.5256 22.69 10.5962Z",fill:"#5298FF"}),r.createElement("path",{d:"M4.04505 5.66275C4.2694 5.24473 4.59318 4.88836 4.98783 4.62508L11.611 0L4.82476 11.2217C4.82476 11.2217 4.23182 10.2196 4.00057 9.71266C3.7124 9.07515 3.56707 8.38236 3.57475 7.68278C3.58243 6.98321 3.74296 6.29378 4.04505 5.66275ZM1.31159 13.4038C1.38637 14.477 1.68956 15.5217 2.20086 16.4682C2.71216 17.4146 3.41976 18.2409 4.27629 18.8917L11.6021 24C11.6021 24 7.01863 17.3944 3.15267 10.8215C2.76128 10.1271 2.49816 9.36782 2.37592 8.58011C2.3218 8.22341 2.3218 7.86059 2.37592 7.50389C2.27512 7.69068 2.07945 8.07313 2.07945 8.07313C1.68745 8.87262 1.42049 9.72754 1.28787 10.608C1.21154 11.5388 1.21948 12.4745 1.31159 13.4038ZM19.9892 14.2933C19.752 13.7863 19.165 12.7842 19.165 12.7842L12.3907 24L19.0138 19.3779C19.4085 19.1146 19.7322 18.7582 19.9566 18.3402C20.2587 17.7092 20.4192 17.0198 20.4269 16.3202C20.4346 15.6206 20.2892 14.9278 20.0011 14.2903L19.9892 14.2933ZM22.6782 10.5991C22.6034 9.526 22.3002 8.48124 21.7889 7.53479C21.2776 6.58835 20.57 5.76208 19.7135 5.1113L12.3996 0C12.3996 0 16.98 6.60556 20.849 13.1785C21.2393 13.8731 21.5014 14.6324 21.6227 15.4199C21.6769 15.7766 21.6769 16.1394 21.6227 16.4961C21.7235 16.3093 21.9192 15.9269 21.9192 15.9269C22.3112 15.1274 22.5782 14.2725 22.7108 13.392C22.7881 12.4613 22.7812 11.5256 22.69 10.5962L22.6782 10.5991Z",fill:"#5298FF"})),Zr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M1.5 3.1579H22.5",stroke:"currentColor",strokeLinecap:"round"}),r.createElement("path",{d:"M1.5 12H22.5",stroke:"currentColor",strokeLinecap:"round"}),r.createElement("path",{d:"M1.5 20.8421H22.5",stroke:"currentColor",strokeLinecap:"round"})),Ar=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"})),Wr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})),Nr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})),_r=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})),Yr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})),Ir=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})),Ur=({title:e,titleId:t,...o})=>r.createElement("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M21 3.00006L15 9.00006L12 12.0001H3M15 3.00006H21H15ZM21 3.00006V9.00006V3.00006Z",strokeLinecap:"round",strokeLinejoin:"round"}),r.createElement("path",{d:"M21 21.0001L15 15.0001M15 21.0001H21H15ZM21 21.0001V15.0001V21.0001Z",strokeLinecap:"round",strokeLinejoin:"round"})),qr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"})),Xr=({title:e,titleId:t,...o})=>r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M10 5C9.34339 5 8.69321 5.12933 8.08658 5.3806C7.47995 5.63188 6.92876 6.00017 6.46447 6.46447C6.00017 6.92876 5.63188 7.47995 5.3806 8.08658C5.12933 8.69321 5 9.34339 5 10C5 10.6566 5.12933 11.3068 5.3806 11.9134C5.63188 12.52 6.00017 13.0712 6.46447 13.5355C6.63214 13.7032 6.81114 13.8584 7 14C7 13.0807 7.18106 12.1705 7.53284 11.3212C7.88463 10.4719 8.40024 9.70026 9.05025 9.05025C9.70026 8.40024 10.4719 7.88463 11.3212 7.53284C12.1705 7.18106 13.0807 7 14 7C14 7 14 7 14 7C13.8589 6.81181 13.7038 6.63276 13.5355 6.46447C12.5979 5.52678 11.3261 5 10 5ZM16.5277 7.47231C16.1793 6.57251 15.6452 5.74574 14.9497 5.05025C13.637 3.7375 11.8565 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C7.37137 16.4879 7.42174 16.5081 7.47231 16.5277C7.49189 16.5783 7.51207 16.6286 7.53284 16.6788C7.88463 17.5281 8.40024 18.2997 9.05025 18.9497C9.70026 19.5998 10.4719 20.1154 11.3212 20.4672C12.1705 20.8189 13.0807 21 14 21C15.8565 21 17.637 20.2625 18.9497 18.9497C20.2625 17.637 21 15.8565 21 14C21 12.1435 20.2625 10.363 18.9497 9.05025C18.2543 8.35477 17.4275 7.82074 16.5277 7.47231ZM12.0866 9.3806C12.6932 9.12933 13.3434 9 14 9C15.3261 9 16.5979 9.52678 17.5355 10.4645C18.4732 11.4021 19 12.6739 19 14C19 15.3261 18.4732 16.5979 17.5355 17.5355C16.5979 18.4732 15.3261 19 14 19C13.3434 19 12.6932 18.8707 12.0866 18.6194C11.48 18.3681 10.9288 17.9998 10.4645 17.5355C10.0002 17.0712 9.63188 16.52 9.3806 15.9134C9.12933 15.3068 9 14.6566 9 14C9 13.3434 9.12933 12.6932 9.3806 12.0866C9.63188 11.48 10.0002 10.9288 10.4645 10.4645C10.9288 10.0002 11.48 9.63188 12.0866 9.3806Z",fill:"currentColor"})),Kr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"})),Jr=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"})),Qr=({title:e,titleId:t,...o})=>r.createElement("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 10.4C12.7956 10.4 13.5587 10.0629 14.1213 9.46274C14.6839 8.86263 15 8.04869 15 7.2C15 6.35131 14.6839 5.53737 14.1213 4.93726C13.5587 4.33714 12.7956 4 12 4C11.2044 4 10.4413 4.33714 9.87868 4.93726C9.31607 5.53737 9 6.35131 9 7.2C9 8.04869 9.31607 8.86263 9.87868 9.46274C10.4413 10.0629 11.2044 10.4 12 10.4ZM5 20C5 19.0195 5.18106 18.0485 5.53284 17.1426C5.88463 16.2367 6.40024 15.4136 7.05025 14.7203C7.70026 14.0269 8.47194 13.4769 9.32122 13.1017C10.1705 12.7265 11.0807 12.5333 12 12.5333C12.9193 12.5333 13.8295 12.7265 14.6788 13.1017C15.5281 13.4769 16.2997 14.0269 16.9497 14.7203C17.5998 15.4136 18.1154 16.2367 18.4672 17.1426C18.8189 18.0485 19 19.0195 19 20H5Z",fill:"currentColor"})),eo=({title:e,titleId:t,...o})=>r.createElement("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{d:"M11 8C11 8.79565 10.6839 9.55871 10.1213 10.1213C9.55871 10.6839 8.79565 11 8 11C7.20435 11 6.44129 10.6839 5.87868 10.1213C5.31607 9.55871 5 8.79565 5 8C5 7.20435 5.31607 6.44129 5.87868 5.87868C6.44129 5.31607 7.20435 5 8 5C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8ZM19 8C19 8.39397 18.9224 8.78407 18.7716 9.14805C18.6209 9.51203 18.3999 9.84274 18.1213 10.1213C17.8427 10.3999 17.512 10.6209 17.1481 10.7716C16.7841 10.9224 16.394 11 16 11C15.606 11 15.2159 10.9224 14.8519 10.7716C14.488 10.6209 14.1573 10.3999 13.8787 10.1213C13.6001 9.84274 13.3791 9.51203 13.2284 9.14805C13.0776 8.78407 13 8.39397 13 8C13 7.20435 13.3161 6.44129 13.8787 5.87868C14.4413 5.31607 15.2044 5 16 5C16.7956 5 17.5587 5.31607 18.1213 5.87868C18.6839 6.44129 19 7.20435 19 8ZM14.93 19C14.976 18.673 15 18.34 15 18C15.0023 16.4289 14.4737 14.903 13.5 13.67C14.2601 13.2312 15.1223 13.0001 16 13.0001C16.8776 13.0001 17.7399 13.2311 18.4999 13.67C19.26 14.1088 19.8912 14.74 20.3301 15.5C20.7689 16.2601 21 17.1223 21 18V19H14.93ZM8 13C9.32608 13 10.5979 13.5268 11.5355 14.4645C12.4732 15.4021 13 16.6739 13 18V19H3V18C3 16.6739 3.52678 15.4021 4.46447 14.4645C5.40215 13.5268 6.67392 13 8 13Z",fill:"currentColor"})),to=({title:e,titleId:t,...o})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"1em",height:"1em",focusable:"false",shapeRendering:"geometricPrecision","aria-labelledby":t,...o},e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"})),jn=d.default.div(({theme:e,$type:t,$alignment:o})=>n.css`
    width: ${e.space.full};
    padding: ${e.space[6]} ${e.space[4]};

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: ${e.space[2]};
    border-radius: ${e.radii.large};
    text-align: center;

    ${o==="horizontal"&&n.css`
      flex-direction: row;
      justify-content: flex-start;
      gap: ${e.space[4]};
      padding: ${e.space[4]};
    `}

    background-color: ${e.colors.lightBlue};

    ${t==="warning"&&n.css`
      background-color: ${e.colors.lightYellow};
    `}

    ${t==="error"&&n.css`
      background-color: ${e.colors.lightRed};
    `}
  `),On=d.default.div(({theme:e,$type:t})=>n.css`
    width: ${e.space[6]};
    height: ${e.space[6]};

    color: ${e.colors.blue};

    ${t==="warning"&&n.css`
      color: ${e.colors.yellow};
    `}
    ${t==="error"&&n.css`
      color: ${e.colors.red};
    `}
  `),nt=({type:e="info",alignment:t="vertical",children:o,...a})=>{const s=e==="info"?ot:tt;return r.createElement(jn,{$alignment:t,$type:e,...a},r.createElement(On,{$type:e,as:s}),o)};nt.displayName="Helper";const _e=(e,t,o)=>typeof o=="string"?o:(o==null?void 0:o[e])||t,Fn=d.default.div(({theme:e,$size:t,$disabled:o,$error:a,$suffix:s,$userStyles:i,$validated:l,$showDot:c})=>n.css`
    position: relative;
    background-color: ${e.colors.backgroundSecondary};
    border-radius: ${e.radii["2xLarge"]};
    border-width: ${e.space["0.75"]};
    border-color: ${e.colors.transparent};
    color: ${e.colors.text};
    display: flex;
    transition-duration: ${e.transitionDuration[150]};
    transition-property: color, border-color, background-color;
    transition-timing-function: ${e.transitionTimingFunction.inOut};
    box-sizing: content-box;
    background-clip: content-box;

    :after {
      content: '';
      position: absolute;
      width: ${e.space[4]};
      height: ${e.space[4]};
      box-sizing: border-box;
      border-radius: 50%;
      right: 0;
      top: 0;
      transition: all 0.3s ease-out;
      ${()=>a&&c?n.css`
            background-color: ${e.colors.red};
            border: 2px solid ${e.colors.white};
            transform: translate(50%, -50%) scale(1);
          `:l&&c?n.css`
            background-color: ${e.colors.green};
            border: 2px solid ${e.colors.white};
            transform: translate(50%, -50%) scale(1);
          `:n.css`
          background-color: ${e.colors.transparent};
          border: 2px solid ${e.colors.transparent};
          transform: translate(50%, -50%) scale(0.2);
        `}
    }

    &:focus-within {
      ${!a&&n.css`
        border-color: ${e.colors.accentSecondary};
      `}
    }

    &:focus-within::after {
      ${!a&&c&&n.css`
        background-color: ${e.colors.blue};
        border-color: ${e.colors.white};
        transform: translate(50%, -50%) scale(1);
      `}
    }

    ${o&&n.css`
      border-color: ${e.colors.foregroundSecondary};
      background-color: ${e.colors.background};
    `}

    ${a&&n.css`
      border-color: ${e.colors.red};
      cursor: default;
    `}

  ${s&&n.css`
      height: ${e.space[16]};
    `}

  ${()=>{switch(t){case"medium":return n.css`
            height: ${e.space[14]};
          `;case"large":return n.css`
            height: ${e.space[16]};
          `;case"extraLarge":return n.css`
            height: ${e.space[18]};
          `;default:return""}}}
  ${i}
  `),Dn=d.default.label(({theme:e,$padding:t})=>n.css`
    align-items: center;
    display: flex;
    height: ${e.space.full};
    line-height: normal;
    color: inherit;
    font-family: ${e.fonts.sans};
    font-weight: ${e.fontWeights.medium};
    padding-left: ${e.space[t]};
  `),Zn=d.default.label(({theme:e,$padding:t})=>n.css`
    align-items: center;
    display: flex;
    height: ${e.space.full};
    line-height: normal;
    color: inherit;
    font-family: ${e.fonts.sans};
    font-weight: ${e.fontWeights.medium};
    padding-right: ${e.space[t]};
  `),An=d.default.div(({theme:e})=>n.css`
    overflow: hidden;
    position: relative;
    width: ${e.space.full};
  `),Wn=d.default.input(({theme:e,disabled:t,type:o,$size:a,$padding:s})=>n.css`
    background-color: ${e.colors.transparent};
    position: relative;
    width: ${e.space.full};
    height: ${e.space.full};
    padding: 0 ${e.space[s]};
    font-weight: ${e.fontWeights.medium};
    text-overflow: ellipsis;

    &::placeholder {
      color: ${e.colors.textPlaceholder};
      font-weight: ${e.fontWeights.medium};
    }

    ${t&&n.css`
      opacity: ${e.opacity[50]};
      cursor: not-allowed;
    `}

    ${o==="number"&&n.css`
      font-feature-settings: 'kern' 1, 'tnum' 1, 'calt' 0;
      font-variant-numeric: tabular-nums;
    `}

  ${()=>{switch(a){case"medium":return n.css`
            font-size: ${e.fontSizes.base};
          `;case"large":return n.css`
            font-size: ${e.fontSizes.large};
          `;case"extraLarge":return n.css`
            font-size: ${e.fontSizes.headingThree};
          `;default:return""}}}
  `),Nn=d.default.div(({theme:e,$type:t,$size:o})=>n.css`
    inset: 0;
    position: absolute;
    pointer-events: none;
    white-space: pre;
    line-height: normal;
    display: flex;
    align-items: center;

    padding: 0 ${e.space[4]};
    border-color: ${e.colors.transparent};

    ${t==="number"&&n.css`
      font-feature-settings: 'kern' 1, 'tnum' 1, 'calt' 0;
      font-variant-numeric: tabular-nums;
    `}

    ${()=>{switch(o){case"medium":return n.css`
            font-size: ${e.fontSizes.base};
          `;case"large":return n.css`
            font-size: ${e.fontSizes.large};
          `;case"extraLarge":return n.css`
            font-size: ${e.fontSizes.headingThree};
            padding: 0 ${e.space[6]};
          `;default:return""}}}
  `),_n=d.default.span(({theme:e})=>n.css`
    color: ${e.colors.text};
    font-weight: ${e.fontWeights.medium};
  `),at=r.forwardRef(({autoFocus:e,autoComplete:t="off",autoCorrect:o,defaultValue:a,description:s,disabled:i,error:l,validated:c,showDot:u,hideLabel:g,id:w,inputMode:h,label:v,labelSecondary:m,labelPlacement:x,name:$,placeholder:C,prefix:y,prefixAs:b,readOnly:E,required:p,spellCheck:k,suffix:P,suffixAs:G,tabIndex:B,type:z="text",units:j,value:U,width:ne,onBlur:Q,onChange:q,onFocus:de,onKeyDown:S,size:T="medium",parentStyles:O,padding:_,...D},ue)=>{const xe=r.useRef(null),ee=ue||xe,[ae,ie]=r.useState({ghostValue:U||a}),ge=C?`${C!=null?C:""}${j?` ${j}`:""}`:void 0,te=l?!0:void 0,pe=z==="number"?"number":"text",Y=r.useCallback(H=>{const F=H.target.value;ie(se=>({...se,ghostValue:F}))},[]),fe=r.useCallback(H=>{if(z==="number"){const F=H.key;["E","e","+"].includes(F)&&H.preventDefault()}S&&S(H)},[z,S]),re=r.useCallback(H=>{var F;(F=H.target)==null||F.blur()},[]),le=_e("prefix","4",_),ke=_e("input",T==="extraLarge"?"6":"4",_),De=_e("suffix","2",_);return r.createElement(K,{description:s,error:l,hideLabel:g,id:w,label:v,labelPlacement:x,labelSecondary:m,required:p,width:ne},H=>r.createElement(Fn,{$disabled:i,$error:te,$validated:c,$showDot:u,$suffix:P!==void 0,$size:T,$userStyles:O},y&&r.createElement(Dn,{"aria-hidden":"true",as:b,...H==null?void 0:H.label,$padding:le},y),r.createElement(An,null,r.createElement(Wn,{ref:ee,...D,...H==null?void 0:H.content,"aria-invalid":te,onInput:Y,onKeyDown:z==="number"?fe:S,onWheel:z==="number"?re:void 0,$padding:ke,$size:T,autoComplete:t,autoCorrect:o,autoFocus:e,defaultValue:a,disabled:i,inputMode:h,name:$,placeholder:ge,readOnly:E,spellCheck:k,tabIndex:B,type:pe,value:U,onBlur:Q,onChange:q,onFocus:de}),j&&ae.ghostValue&&r.createElement(Nn,{$size:T,$type:pe,"aria-hidden":"true","data-testid":"ghost"},r.createElement("span",{style:{visibility:"hidden"}},ae.ghostValue," "),r.createElement(_n,null,j))),P&&r.createElement(Zn,{"aria-hidden":"true",as:G,...H==null?void 0:H.label,$padding:De},P)))});at.displayName="Input";const Yn=d.default.div(({theme:e,$state:t})=>n.css`
    width: 95%;

    position: fixed;
    left: 2.5%;
    z-index: 9999;
    bottom: ${e.space[4]};

    display: flex;
    flex-direction: row;

    ${oe.sm.min(n.css`
      width: min-content;

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      bottom: initial;
    `)}

    transition: ${e.transitionDuration[300]} all
      ${e.transitionTimingFunction.popIn};

    ${t==="entered"?n.css`
          opacity: 1;
          transform: translateY(0px);
        `:n.css`
          opacity: 0;
          transform: translateY(128px);
        `}
  `),ye=({children:e,backdropSurface:t,onDismiss:o,open:a,...s})=>r.createElement(we,{open:a,surface:t,onDismiss:o},({state:i})=>r.createElement(Yn,{$state:i,...s},e));ye.displayName="Modal";const In=d.default.div(({theme:e})=>n.css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${e.space[2]};
    flex-gap: ${e.space[2]};
  `),Un=d.default.button(({theme:e,$selected:t})=>n.css`
    background-color: transparent;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
    ${t?n.css`
          background-color: ${e.colors.background};
          cursor: default;
          pointer-events: none;
        `:n.css`
          &:hover {
            background-color: ${e.colors.foregroundSecondary};
          }
        `}

    border-radius: ${e.radii.extraLarge};
    border: 1px solid ${e.colors.borderSecondary};
    min-width: ${e.space[10]};
    padding: ${e.space[2]};
    height: ${e.space[10]};
    font-size: ${e.fontSizes.small};
    font-weight: ${e.fontWeights.medium};
    color: ${e.colors.text};
  `),qn=d.default.p(({theme:e})=>n.css`
    font-size: ${e.fontSizes.small};
    font-weight: ${e.fontWeights.bold};
    color: ${e.colors.textTertiary};
  `),ro=({total:e,current:t,max:o=5,alwaysShowFirst:a,alwaysShowLast:s,onChange:i,...l})=>{const c=Math.floor(o/2),u=Math.max(Math.min(Math.max(t-c,1),e-o+1),1),g=Array.from({length:o},(w,h)=>u+h).filter(w=>w<=e);return e>o&&(a&&u>1?(g[0]=-1,g.unshift(1)):u>1&&g.unshift(-1),s&&e>t+c?(g[g.length-1]=-1*e,g.push(e)):e>t+c&&g.push(-1*e)),r.createElement(In,{...l,"data-testid":J(l,"pagebuttons")},g.map(w=>0>w?r.createElement(qn,{"data-testid":"pagebutton-dots",key:w},"..."):r.createElement(Un,{$selected:w===t,"data-testid":"pagebutton",key:w,type:"button",onClick:()=>i(w)},w)))},Tt=d.default.div(({theme:e,$size:t,$hasChevron:o,$open:a})=>n.css`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: ${e.radii.full};
    transition-duration: ${e.transitionDuration[150]};
    transition-property: color, border-color, background-color, transform,
      filter, box-shadow;
    transition-timing-function: ${e.transitionTimingFunction.inOut};
    position: relative;
    z-index: 10;
    padding: ${e.space[2]} ${e.space[4]} ${e.space[2]}
      ${e.space["2.5"]};
    box-shadow: ${e.shadows["0.25"]};
    color: ${e.colors.foregroundSecondary};
    background-color: ${e.colors.groupBackground};

    ${o&&n.css`
      cursor: pointer;
      &:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
    `}

    ${a&&n.css`
      box-shadow: ${e.shadows[0]};
      background-color: ${e.colors.foregroundSecondary};
    `}

  ${()=>{switch(t){case"small":return n.css`
            max-width: ${e.space[48]};
          `;case"medium":return n.css`
            max-width: ${e.space[52]};
          `;case"large":return n.css`
            max-width: ${e.space[80]};
          `;default:return""}}}

  ${()=>{if(t==="small"&&o)return n.css`
          max-width: ${e.space[52]};
        `;if(t==="medium"&&o)return n.css`
          max-width: ${e.space[56]};
        `;if(t==="large"&&o)return n.css`
          max-width: calc(${e.space[80]} + ${e.space[4]});
        `}}
  `),Xn=d.default.div(({theme:e})=>n.css`
    width: ${e.space[12]};
  `),Kn=d.default.svg(({theme:e,$open:t})=>n.css`
    margin-left: ${e.space[1]};
    width: ${e.space[3]};
    margin-right: ${e.space["0.5"]};
    transition-duration: ${e.transitionDuration[200]};
    transition-property: all;
    transition-timing-function: ${e.transitionTimingFunction.inOut};
    opacity: 0.3;
    transform: rotate(0deg);
    display: flex;
    color: ${e.colors.foreground};

    ${t&&n.css`
      opacity: 1;
      transform: rotate(180deg);
    `}
  `),Jn=d.default.div(({theme:e,$size:t})=>n.css`
    display: ${t==="small"?"none":"block"};
    margin: 0 ${e.space["1.5"]};
    min-width: ${e.space.none};
  `),Vt=d.default(I)(()=>n.css`
    line-height: initial;
  `),Mt=({size:e,avatar:t,address:o,ensName:a})=>r.createElement(r.Fragment,null,r.createElement(Xn,null,r.createElement(Pe,{label:"profile-avatar",src:t})),r.createElement(Jn,{$size:e},r.createElement(Vt,{color:a?"text":"textTertiary",ellipsis:!0,forwardedAs:"h3",variant:a&&e==="large"?"extraLarge":"large",weight:"bold"},a||"No name set"),r.createElement(Vt,{color:a?"textTertiary":"text",forwardedAs:"h4",variant:"small",weight:"bold"},mn(o,e==="large"?30:10,e==="large"?10:5,e==="large"?10:5)))),st=({size:e="medium",avatar:t,dropdownItems:o,address:a,ensName:s,alignDropdown:i="left",...l})=>{const[c,u]=r.useState(!1);return o?r.createElement(Fe,{items:o,isOpen:c,setIsOpen:u,align:i},r.createElement(Tt,{...l,$hasChevron:!0,$open:c,$size:e,onClick:()=>u(!c)},r.createElement(Mt,{size:e,avatar:t,address:a,ensName:s}),r.createElement(Kn,{$open:c,as:he}))):r.createElement(Tt,{...l,"data-testid":J(l,"profile"),$open:c,$size:e},r.createElement(Mt,{size:e,avatar:t,address:a,ensName:s}))};st.displayName="Profile";const Qn=d.default.input(({theme:e})=>n.css`
    cursor: pointer;
    font: inherit;
    border-radius: 50%;
    display: grid;
    place-content: center;
    transition: transform 150ms ease-in-out, filter 150ms ease-in-out;

    &:hover {
      transform: translateY(-1px);
      filter: contrast(0.7);
    }

    &:active {
      transform: translateY(0px);
      filter: contrast(1);
    }

    width: ${e.space[6]};
    height: ${e.space[6]};
    margin: ${e.space[2]} 0;
    background-color: ${e.colors.backgroundHide};

    &::before {
      content: '';
      width: ${e.space["4.5"]};
      height: ${e.space["4.5"]};
      border-radius: 50%;
      transform: scale(0);
      transition: transform 90ms ease-in-out;
      background-image: ${e.colors.gradients.blue};
      background-size: 100% 100%;
      background-position: center;
    }

    &:checked::before {
      transform: scale(1);
    }
  `),it=r.forwardRef(({description:e,disabled:t,error:o,inline:a=!0,hideLabel:s,id:i,label:l,labelSecondary:c,name:u,required:g,tabIndex:w,value:h,checked:v,width:m,onBlur:x,onChange:$,onFocus:C,labelRight:y,...b},E)=>{const p=r.useRef(null),k=E||p;return r.createElement(K,{description:e,error:o,hideLabel:s,id:i,inline:a,label:l,labelSecondary:c,required:g,width:m,labelRight:y},r.createElement(Qn,{...b,"aria-invalid":o?!0:void 0,"aria-selected":v?!0:void 0,"data-testid":J(b,"radio"),type:"radio",role:"radio",checked:v,disabled:t,name:u,ref:k,tabIndex:w,value:h,onBlur:x,onChange:$,onFocus:C}))});it.displayName="RadioButton";const ea=e=>{let t=!1,o=!1;const a=()=>{t=!0,e.preventDefault()},s=()=>{o=!0,e.stopPropagation()};return{nativeEvent:e,currentTarget:e.currentTarget,target:e.target,bubbles:e.bubbles,cancelable:e.cancelable,defaultPrevented:e.defaultPrevented,eventPhase:e.eventPhase,isTrusted:e.isTrusted,preventDefault:a,isDefaultPrevented:()=>t,stopPropagation:s,isPropagationStopped:()=>o,persist:()=>{},timeStamp:e.timeStamp,type:e.type}},ta=d.default.div(({theme:e,$inline:t})=>n.css`
    display: flex;
    flex-direction: ${t?"row":"column"};
    gap: ${e.space[2]};
    justify-content: flex-start;
    flex-wrap: ${t?"wrap":"nowrap"};
  `),lt=r.forwardRef(({value:e,children:t,inline:o=!1,onChange:a,onBlur:s,...i},l)=>{const c=r.useRef(null),u=l||c,g=r.useRef(null),[w,h]=r.useState(!1),[v,m]=r.useState(e);r.useEffect(()=>{e&&e!=v&&m(e)},[e]);const x=b=>{m(b.target.value),a&&a(b)},$=()=>{g.current&&g.current.focus()},C=b=>{s&&s(b)},y=(b,E="radiogroup")=>{if(a&&b){const p=document.createElement("input");p.value=b,p.name=E;const k=new Event("change",{bubbles:!0});Object.defineProperty(k,"target",{writable:!1,value:p});const P=ea(k);a(P)}};return r.createElement(ta,{$inline:o,...i,"data-testid":J(i,"radiogroup"),ref:u,role:"radiogroup",onFocus:$},r.Children.map(t,b=>{b.props.checked&&!w&&(h(!0),v!==b.props.value&&(m(b.props.value),h(!0),y(b.props.value,b.props.name)));const E=b.props.value===v;return r.cloneElement(b,{ref:E?g:void 0,checked:E,onChange:x,onBlur:C})}))});lt.displayName="RadioButtonGroup";var Te=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},ra=typeof Te=="object"&&Te&&Te.Object===Object&&Te,oa=ra,na=oa,aa=typeof self=="object"&&self&&self.Object===Object&&self,sa=na||aa||Function("return this")(),ia=sa,la=ia,ca=la.Symbol,ct=ca;function da(e,t){for(var o=-1,a=e==null?0:e.length,s=Array(a);++o<a;)s[o]=t(e[o],o,e);return s}var ua=da,ga=Array.isArray,pa=ga,Pt=ct,oo=Object.prototype,fa=oo.hasOwnProperty,ba=oo.toString,$e=Pt?Pt.toStringTag:void 0;function $a(e){var t=fa.call(e,$e),o=e[$e];try{e[$e]=void 0;var a=!0}catch{}var s=ba.call(e);return a&&(t?e[$e]=o:delete e[$e]),s}var ma=$a,wa=Object.prototype,ha=wa.toString;function Ca(e){return ha.call(e)}var ya=Ca,Bt=ct,va=ma,xa=ya,ka="[object Null]",Ea="[object Undefined]",Gt=Bt?Bt.toStringTag:void 0;function Sa(e){return e==null?e===void 0?Ea:ka:Gt&&Gt in Object(e)?va(e):xa(e)}var La=Sa;function Ra(e){return e!=null&&typeof e=="object"}var Ta=Ra,Va=La,Ma=Ta,Pa="[object Symbol]";function Ba(e){return typeof e=="symbol"||Ma(e)&&Va(e)==Pa}var Ga=Ba,zt=ct,za=ua,Ha=pa,ja=Ga,Oa=1/0,Ht=zt?zt.prototype:void 0,jt=Ht?Ht.toString:void 0;function no(e){if(typeof e=="string")return e;if(Ha(e))return za(e,no)+"";if(ja(e))return jt?jt.call(e):"";var t=e+"";return t=="0"&&1/e==-Oa?"-0":t}var Fa=no,Da=Fa;function Za(e){return e==null?"":Da(e)}var Aa=Za,Wa=Aa,Na=0;function _a(e){var t=++Na;return Wa(e)+t}var Ya=_a;const Ye="CREATE_OPTION_VALUE",Ia=d.default.div(({theme:e,$disabled:t,$size:o})=>n.css`
    background: ${e.colors.background};
    border-color: ${e.colors.backgroundHide};
    border-width: ${e.space.px};
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    overflow: hidden;
    ${o==="medium"?n.css`
          border-radius: ${e.radii["2xLarge"]};
          height: ${e.space[14]};
        `:n.css`
          border-radius: ${e.radii.almostExtraLarge};
          height: ${e.space[10]};
        `}

    ${t&&n.css`
      cursor: not-allowed;
      background: ${e.colors.backgroundTertiary};
    `}
  `),Ua=d.default.div(()=>n.css`
    flex: 1;
  `),qa=d.default.div(()=>n.css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `),Xa=d.default.div(({theme:e,$padding:t,$gap:o})=>n.css`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    gap: ${e.space[o]};
    padding: ${e.space[t]};
    padding-right: 0;
  `),Ka=d.default.div(({theme:e,$padding:t})=>n.css`
    padding: ${e.space[t]};
    padding-right: 0;
    font-style: italic;
  `),Ja=d.default.input(({theme:e,$padding:t})=>n.css`
    padding: ${e.space[t]};
    padding-right: 0;
    width: 100%;
    height: 100%;
  `),Ot=d.default.button(({theme:e,$padding:t})=>n.css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: ${e.space[t]};
    svg {
      display: block;
      width: 12px;
      path {
        color: ${e.colors.textSecondary};
      }
    }
  `),Qa=d.default(he)(({theme:e,$open:t,$disabled:o,$direction:a})=>n.css`
    margin-left: ${e.space[1]};
    width: ${e.space[3]};
    margin-right: ${e.space["0.5"]};
    transition-duration: ${e.transitionDuration[200]};
    transition-property: all;
    transition-timing-function: ${e.transitionTimingFunction.inOut};
    opacity: 0.3;
    transform: ${a==="up"?"rotate(180deg)":"rotate(0deg)"};
    display: flex;

    & > svg {
      fill: currentColor;
    }
    fill: currentColor;

    ${t&&n.css`
      opacity: 1;
      transform: ${a==="up"?"rotate(0deg)":"rotate(180deg)"};
    `}

    ${o&&n.css`
      opacity: 0.1;
    `}
  `),es=d.default.div(({theme:e,$state:t,$direction:o,$rows:a})=>n.css`
    display: ${t==="exited"?"none":"block"};
    position: absolute;
    visibility: hidden;
    opacity: 0;
    overflow: hidden;

    margin-top: ${e.space["1.5"]};
    padding: ${e.space["1.5"]};
    min-width: ${e.space.full};
    border-radius: ${e.radii.medium};
    box-shadow: ${e.boxShadows["0.02"]};
    background: ${e.colors.background};
    transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0.3s linear;

    ${t==="entered"?n.css`
          z-index: 20;
          visibility: visible;
          top: ${o==="up"?"auto":`calc(100% + ${e.space["1.5"]})`};
          bottom: ${o==="up"?`calc(100% + ${e.space["1.5"]})`:"auto"};
          opacity: ${e.opacity[100]};
        `:n.css`
          z-index: 1;
          visibility: hidden;
          top: ${o==="up"?"auto":`calc(100% - ${e.space[12]})`};
          bottom: ${o==="up"?`calc(100% - ${e.space[12]})`:"auto"};
          opacity: 0;
        `}

    ${a&&n.css`
      padding-right: ${e.space[1]};
    `}
  `),ts=d.default.div(({theme:e,$rows:t,$direction:o})=>n.css`
    display: flex;
    flex-direction: ${o==="up"?"column-reverse":"column"};
    align-items: flex-start;
    justify-content: space-between;
    overflow-y: ${t?"scroll":"hidden"};
    overflow-x: hidden;
    width: 100%;
    height: 100%;

    ${t&&n.css`
      max-height: calc(${e.space[9]} * ${t});
      border-color: rgba(${e.shadesRaw.foreground}, 0.05);
      transition: border-color 0.15s ease-in-out;
      padding-right: ${e.space[1]};

      /* stylelint-disable-next-line selector-pseudo-element-no-unknown */
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      &::-webkit-scrollbar {
        width: ${e.space["1.5"]};
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border: none;
        border-radius: ${e.radii.full};
        border-right-style: inset;
        border-right-width: calc(100vw + 100vh);
        border-color: inherit;
      }

      &::-webkit-scrollbar-button {
        display: none;
      }

      &:hover {
        border-color: rgba(${e.shadesRaw.foreground}, 0.2);
      }
    `}
  `),rs=d.default.div(({theme:e,$selected:t,$disabled:o,$highlighted:a,$gap:s})=>n.css`
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: ${e.space[s]};
    width: ${e.space.full};
    height: ${e.space[9]};
    padding: ${e.space["2.5"]} ${e.space[2]};
    justify-content: flex-start;
    transition-duration: ${e.transitionDuration[150]};
    transition-property: all;
    transition-timing-function: ${e.transitionTimingFunction.inOut};
    border-radius: ${e.radii.medium};
    margin: ${e.space["0.5"]} 0;
    white-space: nowrap;

    &:first-child {
      margin-top: ${e.space[0]};
    }

    &:last-child {
      margin-bottom: ${e.space[0]};
    }

    ${()=>{if(t)return n.css`
          background-color: ${e.colors.foregroundSecondary};
        `;if(a)return n.css`
          background-color: ${e.colors.foregroundSecondaryHover};
        `}}

    ${o&&n.css`
      color: ${e.colors.textTertiary};
      cursor: not-allowed;

      &:hover {
        background-color: ${e.colors.transparent};
      }
    `}
  `),os=d.default.div(({theme:e})=>n.css`
    align-items: center;
    display: flex;
    gap: ${e.space[3]};
    width: ${e.space.full};
    height: ${e.space[9]};
    padding: 0 ${e.space[2]};
    justify-content: flex-start;
    transition-duration: ${e.transitionDuration[150]};
    transition-property: all;
    transition-timing-function: ${e.transitionTimingFunction.inOut};
    border-radius: ${e.radii.medium};
    margin: ${e.space["0.5"]} 0;
    font-style: italic;
    white-space: nowrap;

    &:first-child {
      margin-top: ${e.space[0]};
    }

    &:last-child {
      margin-bottom: ${e.space[0]};
    }
  `),ns=e=>(t,o)=>{if(o.label){const a=o.label.trim().toLowerCase();a.indexOf(e)!==-1&&t.options.push(o),a===e&&(t.exactMatch=!0)}return t};var ao=(e=>(e.ArrowUp="ArrowUp",e.ArrowDown="ArrowDown",e.Enter="Enter",e))(ao||{});const Ft=(e,t,o)=>typeof o=="string"?o:(o==null?void 0:o[e])||t,Dt=(e,t,o)=>typeof o=="number"?o:(o==null?void 0:o[e])||t,dt=r.forwardRef(({description:e,disabled:t,autocomplete:o=!1,createable:a=!1,createablePrefix:s="Add ",noSelectionMessage:i,direction:l="down",error:c,hideLabel:u,inline:g,id:w,label:h,labelSecondary:v,required:m,tabIndex:x=-1,width:$,onBlur:C,onChange:y,onFocus:b,onCreate:E,options:p,rows:k,emptyListMessage:P="No results",name:G,value:B,size:z="medium",padding:j,inputSize:U,...ne},Q)=>{const q=r.useRef(null),de=Q||q,S=r.useRef(null),T=r.useRef(null),[O,_]=r.useState(""),[D,ue]=r.useState(""),xe=a&&D!=="",ee=a||o,[ae]=r.useState(w||Ya()),[ie,ge]=r.useState("");r.useEffect(()=>{B!==ie&&B!==void 0&&ge(B)},[B]);const te=(p==null?void 0:p.find(f=>f.value===ie))||null,pe=(f,R)=>{if(!(f!=null&&f.disabled)){if((f==null?void 0:f.value)===Ye)E&&E(D);else if(f!=null&&f.value&&(ge(f==null?void 0:f.value),R)){const N=R.nativeEvent||R,Ee=new N.constructor(N.type,N);Object.defineProperties(Ee,{target:{writable:!0,value:{value:f.value,name:G}},currentTarget:{writable:!0,value:{value:f.value,name:G}}}),y&&y(Ee)}}},Y=r.useMemo(()=>{if(!ee||D==="")return p;const f=D.trim().toLowerCase(),{options:R,exactMatch:N}=(Array.isArray(p)?p:[p]).reduce(ns(f),{options:[],exactMatch:!1});return[...R,...xe&&!N?[{label:`${s}"${D}"`,value:Ye}]:[]]},[p,xe,ee,D,s]),[fe,re]=r.useState(-1),le=r.useCallback(f=>{const R=Y[f];if(R&&!R.disabled&&R.value!==Ye){re(f),_(R.label||"");return}_(D),re(f)},[Y,D,_,re]),ke=f=>{var N;let R=fe;do{if(f==="previous"?R--:R++,R<0)return le(-1);if(Y[R]&&!((N=Y[R])!=null&&N.disabled))return le(R)}while(Y[R])},De=f=>{const R=Y[fe];R&&pe(R,f),mt()},[H,F]=r.useState(!1),se=!t&&H,bo=D!==""&&ee,$o=Dt("min",4,U),mo=Dt("max",20,U),wo=Math.min(Math.max($o,D.length),mo),[Ze,ho]=Wt.useTransition({timeout:{enter:0,exit:300},preEnter:!0});Ve.useEffect(()=>{ho(se)},[se]),Ve.useEffect(()=>{!H&&Ze==="unmounted"&&mt()},[H,Ze]);const bt=z==="medium"?"4":"2",be=Ft("outer",bt,j),$t=Ft("inner",bt,j),mt=()=>{ue(""),_(""),re(-1)},Co=()=>{ee&&!H&&F(!0),ee||F(!H)},wt=f=>{if(!H)return f.stopPropagation(),f.preventDefault(),F(!0);f.key in ao&&(f.preventDefault(),f.stopPropagation(),f.key==="ArrowUp"?ke(l==="up"?"next":"previous"):f.key==="ArrowDown"&&ke(l==="up"?"previous":"next"),f.key==="Enter"&&(De(f),F(!1)))},yo=f=>{const R=f.currentTarget.value;ue(R),_(R),re(-1)},vo=f=>{f.stopPropagation(),ue(""),_(""),re(-1)},xo=()=>{le(-1)},ko=f=>R=>{R.stopPropagation(),pe(f,R),F(!1)},Eo=f=>{const R=Number(f.currentTarget.getAttribute("data-option-index"));isNaN(R)||le(R)};nr(S,"click",()=>F(!1),H);const ht=({option:f})=>f?r.createElement(r.Fragment,null,f.prefix&&r.createElement("div",null,f.prefix),f.node?f.node:f.label||f.value):null;return r.createElement(K,{"data-testid":"select",description:e,error:c,hideLabel:u,id:ae,inline:g,label:h,labelSecondary:v,required:m,width:$},r.createElement("div",{style:{position:"relative"}},r.createElement(Ia,{...ne,"aria-controls":`listbox-${ae}`,"aria-expanded":"true","aria-haspopup":"listbox","aria-invalid":c?!0:void 0,"data-testid":"select-container",role:"combobox",onClick:Co,onKeyDown:wt,$disabled:t,$size:z,id:`combo-${ae}`,ref:S,tabIndex:x,onBlur:C,onFocus:b},r.createElement(Ua,null,ee&&se?r.createElement(Ja,{$padding:be,autoCapitalize:"none",autoComplete:"off",autoFocus:!0,"data-testid":"select-input",placeholder:te==null?void 0:te.label,ref:T,size:wo,spellCheck:"false",style:{flex:"1",height:"100%"},value:O,onChange:yo,onKeyDown:f=>wt(f)}):te?r.createElement(Xa,{$gap:$t,$padding:be,"data-testid":"selected"},r.createElement(ht,{option:te})):i?r.createElement(Ka,{$padding:be},i):null),r.createElement(qa,null,bo?r.createElement(Ot,{$padding:be,type:"button",onClick:vo},r.createElement(rt,null)):r.createElement(Ot,{$padding:be,type:"button"},r.createElement(Qa,{$direction:l,$disabled:t,$open:se,onClick:()=>F(!H)}))),r.createElement(X,null,r.createElement("input",{"aria-hidden":!0,name:G,ref:de,tabIndex:-1,value:ie,onChange:f=>{const R=f.target.value,N=p==null?void 0:p.find(Ee=>Ee.value===R);N&&(ge(N.value),y&&y(f))},onFocus:()=>{var f;T.current?T.current.focus():(f=S.current)==null||f.focus()}}))),r.createElement(es,{$direction:l,$rows:k,$state:Ze,id:`listbox-${ae}`,role:"listbox",tabIndex:-1,onMouseLeave:xo},r.createElement(ts,{$direction:l,$rows:k},Y.length===0&&r.createElement(os,null,P),Y.map((f,R)=>r.createElement(rs,{$selected:(f==null?void 0:f.value)===ie,$disabled:f.disabled,$highlighted:R===fe,$gap:$t,"data-option-index":R,key:f.value,role:"option",onClick:ko(f),onMouseOver:Eo},r.createElement(ht,{option:f})))))))});dt.displayName="Select";const as=d.default.div(({theme:e})=>n.css`
    width: ${e.space.full};
  `),Zt=({theme:e})=>n.css`
  width: ${e.space[4]};
  height: ${e.space[4]};
  background: ${e.colors.accent};
  border-radius: ${e.radii.full};
  cursor: pointer;
  transition: filter 0.15s ease-in-out;
  filter: brightness(1);
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.875);
  }
`,ss=d.default.input(({theme:e,disabled:t})=>n.css`
    appearance: none;
    width: ${e.space.full};
    height: ${e.space["1.5"]};
    background: rgba(${e.accentsRaw.blue}, 0.4);
    border-radius: ${e.radii.full};
    outline: none;

    &::-webkit-slider-thumb {
      appearance: none;
      ${Zt}
    }

    &::-moz-range-thumb {
      ${Zt}
    }

    &:hover {
      background: rgba(${e.accentsRaw.blue}, 0.45);
    }

    ${t&&n.css`
      opacity: 0.5;
      filter: grayscale(100%);
      cursor: not-allowed;
    `}
  `),ut=r.forwardRef(({label:e,description:t,error:o,hideLabel:a,inline:s,labelPlacement:i,labelSecondary:l,required:c,width:u,defaultValue:g,disabled:w,id:h,name:v,readOnly:m,tabIndex:x,value:$,min:C=1,max:y=100,onChange:b,onBlur:E,onFocus:p,step:k="any",...P},G)=>{const B=r.useRef(null),z=G||B;return r.createElement(K,{label:e,description:t,error:o,hideLabel:a,inline:s,labelPlacement:i,labelSecondary:l,required:c,width:u,id:h},j=>r.createElement(as,null,r.createElement(ss,{ref:z,type:"range",...P,...j==null?void 0:j.content,defaultValue:g,disabled:w,name:v,readOnly:m,tabIndex:x,value:$,min:C,max:y,onChange:b,onBlur:E,onFocus:p,step:k})))});ut.displayName="Slider";const is=d.default.div(({theme:e,$error:t,$validated:o,$showDot:a,$disabled:s})=>n.css`
    position: relative;
    background-color: ${e.colors.backgroundSecondary};
    border-radius: ${e.radii["2xLarge"]};
    border-width: ${e.space["0.75"]};
    border-color: ${e.colors.transparent};
    color: ${e.colors.text};
    display: flex;
    transition-duration: ${e.transitionDuration[150]};
    transition-property: color, border-color, background-color;
    transition-timing-function: ${e.transitionTimingFunction.inOut};
    box-sizing: content-box;
    background-clip: content-box;

    :after {
      content: '';
      position: absolute;
      width: ${e.space[4]};
      height: ${e.space[4]};
      box-sizing: border-box;
      border-radius: 50%;
      right: 0;
      top: 0;
      transition: all 0.3s ease-out;
      ${()=>t&&a?n.css`
            background-color: ${e.colors.red};
            border: 2px solid ${e.colors.white};
            transform: translate(50%, -50%) scale(1);
          `:o&&a?n.css`
            background-color: ${e.colors.green};
            border: 2px solid ${e.colors.white};
            transform: translate(50%, -50%) scale(1);
          `:n.css`
          background-color: ${e.colors.transparent};
          border: 2px solid ${e.colors.transparent};
          transform: translate(50%, -50%) scale(0.2);
        `}
    }

    &:focus-within {
      ${!t&&n.css`
        border-color: ${e.colors.accentSecondary};
      `}
    }

    &:focus-within::after {
      ${!t&&a&&n.css`
        background-color: ${e.colors.blue};
        border-color: ${e.colors.white};
        transform: translate(50%, -50%) scale(1);
      `}
    }
    &:focus {
      border-color: ${e.colors.accentSecondary};
    }

    ${s&&n.css`
      border-color: ${e.colors.foregroundSecondary};
      cursor: not-allowed;
    `}

    ${t&&n.css`
      border-color: ${e.colors.red};
      cursor: default;

      &:focus-within {
        border-color: ${e.colors.red};
      }
    `}
  `),ls=d.default.textarea(({theme:e})=>n.css`
    position: relative;
    background-color: ${e.colors.transparent};
    color: ${e.colors.text};
    display: flex;
    font-family: ${e.fonts.sans};
    font-size: ${e.fontSizes.base};
    font-weight: ${e.fontWeights.medium};
    min-height: ${e.space[14]};
    padding: ${e.space[4]};
    width: ${e.space.full};
    resize: none;
    outline: none;

    &::placeholder {
      color: ${e.colors.textPlaceholder};
      font-weight: ${e.fontWeights.medium};
    }
  `),gt=r.forwardRef(({autoCorrect:e,autoFocus:t,defaultValue:o,description:a,disabled:s,error:i,validated:l,showDot:c,hideLabel:u,id:g,label:w,labelSecondary:h,maxLength:v,name:m,placeholder:x,readOnly:$,required:C,rows:y=5,spellCheck:b,tabIndex:E,value:p,width:k,onChange:P,onBlur:G,onFocus:B,...z},j)=>{const U=r.useRef(null),ne=j||U,Q=i?!0:void 0;return r.createElement(K,{description:a,error:i,hideLabel:u,id:g,label:w,labelSecondary:h,required:C,width:k},q=>r.createElement(is,{$disabled:s,$error:!!i,$showDot:c,$validated:l},r.createElement(ls,{...z,...q==null?void 0:q.content,"aria-invalid":Q,$error:Q,$showDot:c,$validated:l,autoCorrect:e,autoFocus:t,defaultValue:o,disabled:s,maxLength:v,name:m,placeholder:x,readOnly:$,ref:ne,rows:y,spellCheck:b,tabIndex:E,value:p,onBlur:G,onChange:P,onFocus:B})))});gt.displayName="Textarea";const cs=d.default.div(({theme:e})=>n.css`
    border-width: 1px;
    border-style: solid;
    box-sizing: border-box;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.02);
    width: 230px;

    border-radius: ${e.space["3.5"]};
    padding: ${e.space["2.5"]} ${e.space["2.5"]} ${e.space["2.5"]}
      ${e.space["3.5"]};
    border-color: ${e.colors.borderSecondary};
    background: ${e.colors.background};
  `),pt=({content:e,...t})=>ze({popover:r.createElement(cs,null,e),...t});pt.displayName="Tooltip";const ds=d.default.div(({theme:e})=>n.css`
    position: absolute;
    top: ${e.space["2.5"]};
    right: ${e.space["2.5"]};
    height: ${e.space[8]};
    width: ${e.space[8]};
    opacity: ${e.opacity[50]};
    cursor: pointer;
    transition-property: all;
    transition-duration: ${e.transitionDuration[150]};
    transition-timing-function: ${e.transitionTimingFunction.inOut};

    &:hover {
      opacity: ${e.opacity[70]};
    }
  `),so=d.default.div(({theme:e})=>n.css`
    padding: ${e.space["3.5"]};
    border-radius: ${e.radii["3xLarge"]};
    background-color: ${e.colors.background};
    position: relative;
    width: 100%;
    ${oe.sm.min(n.css`
      width: initial;
    `)}
  `),us=d.default(I)(({theme:e})=>n.css`
    font-size: ${e.fontSizes.headingThree};
    font-weight: ${e.fontWeights.bold};
  `),gs=d.default(I)(({theme:e})=>n.css`
    font-size: ${e.fontSizes.base};
    font-weight: ${e.fontWeights.medium};
    color: ${e.colors.textSecondary};
    text-align: center;

    padding: 0 ${e.space[4]};
    max-width: ${e.space[72]};
  `),ps=d.default.div(({theme:e,$center:t})=>n.css`
    display: flex;
    align-items: center;
    justify-content: stretch;
    flex-direction: ${t?"column":"row"};
    gap: ${e.space[2]};
    width: ${e.space.full};
    max-width: ${e.space[96]};
  `),fs=d.default.div(({theme:e,$hasSteps:t})=>n.css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${!t&&n.css`
      margin-top: ${e.space["1.5"]};
    `}
  `),io=d.default.div(({theme:e})=>n.css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${e.space[5]};
    ${oe.sm.min(n.css`
      min-width: ${e.space[64]};
    `)}
  `),bs=d.default.div(({theme:e})=>n.css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${e.space[2]};
  `),$s=d.default.div(({theme:e,$type:t})=>n.css`
    border-radius: ${e.radii.full};
    width: ${e.space["3.5"]};
    height: ${e.space["3.5"]};
    ${t==="notStarted"&&n.css`
      border: ${e.borderWidths["0.5"]} ${e.borderStyles.solid}
        ${e.colors.borderSecondary};
    `}
    ${t==="inProgress"&&n.css`
      border: ${e.borderWidths["0.5"]} ${e.borderStyles.solid}
        ${e.colors.accent};
    `}
    ${t==="completed"&&n.css`
      background-color: ${e.colors.accent};
    `}
  `),lo=({currentStep:e,stepCount:t,stepStatus:o,title:a,subtitle:s})=>{const i=r.useCallback(l=>l===e?o||"inProgress":l<(e||0)?"completed":"notStarted",[e,o]);return r.createElement(r.Fragment,null,t&&r.createElement(bs,{"data-testid":"step-container"},Array.from({length:t},(l,c)=>r.createElement($s,{$type:i(c),"data-testid":`step-item-${c}-${i(c)}`,key:c}))),r.createElement(fs,{$hasSteps:!!t},a&&(typeof a!="string"&&a||r.createElement(us,null,a)),s&&(typeof s!="string"&&s||r.createElement(gs,null,s))))},co=({leading:e,trailing:t,center:o})=>r.createElement(ps,{$center:o},e||!o&&r.createElement("div",{style:{flexGrow:1}}),t||!o&&r.createElement("div",{style:{flexGrow:1}})),At=({open:e,onDismiss:t,title:o,subtitle:a,children:s,currentStep:i,stepCount:l,stepStatus:c,...u})=>r.createElement(ye,{...u,open:e,onDismiss:t},r.createElement(so,null,r.createElement(io,null,r.createElement(lo,{title:o,subtitle:a,currentStep:i,stepCount:l,stepStatus:c}),s))),ve=({children:e,onDismiss:t,open:o,variant:a="closable",...s})=>{if(a==="actionable"){const{trailing:i,leading:l,title:c,subtitle:u,center:g,...w}=s;return r.createElement(At,{...w,open:o,subtitle:u,title:c,onDismiss:t},e,(l||i)&&r.createElement(co,{leading:l,trailing:i,center:g}))}else if(a==="closable"){const{title:i,subtitle:l,...c}=s;return r.createElement(At,{...c,open:o,subtitle:l,title:i,onDismiss:t},e,t&&r.createElement(ds,{as:Ce,"data-testid":"close-icon",onClick:t}))}return r.createElement(ye,{onDismiss:t,open:o},r.createElement(so,null,r.createElement(io,null,e)))};ve.displayName="Dialog";ve.Footer=co;ve.Heading=lo;const uo=d.default.div(({theme:e})=>n.css`
    position: absolute;
    top: ${e.space["2.5"]};
    right: ${e.space["2.5"]};
    height: ${e.space[8]};
    width: ${e.space[8]};
    opacity: ${e.opacity[50]};
    cursor: pointer;
    transition-property: all;
    transition-duration: ${e.transitionDuration[150]};
    transition-timing-function: ${e.transitionTimingFunction.inOut};

    &:hover {
      opacity: ${e.opacity[70]};
    }
  `),go=d.default.div(({theme:e,$state:t,$top:o,$left:a,$right:s,$bottom:i,$mobile:l,$popped:c})=>n.css`
    position: fixed;
    z-index: 10000;

    width: 92.5%;
    left: 3.75%;
    top: calc(100vh / 100 * 2.5);

    ${c&&n.css`
      width: 95%;
      left: 2.5%;
      touch-action: none;
    `}

    ${!l&&n.css`
      max-width: ${e.space[112]};
      top: unset;
      left: unset;

      ${o&&`top: ${e.space[o]};`}
      ${a&&`left: ${e.space[a]};`}
      ${s&&`right: ${e.space[s]};`}
      ${i&&`bottom: ${e.space[i]};`}
    `}

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: ${e.space["4.5"]};

    background: rgba(${e.shadesRaw.background}, 0.8);
    box-shadow: ${e.boxShadows["0.02"]};
    border: ${e.borderWidths.px} solid ${e.colors.foregroundSecondary};
    backdrop-filter: blur(16px);
    border-radius: ${e.radii["2xLarge"]};

    transition: ${e.transitionDuration[300]} all
      ${e.transitionTimingFunction.popIn};

    ${t==="entered"?n.css`
          opacity: 1;
          transform: translateY(0px);
        `:n.css`
          opacity: 0;
          transform: translateY(-64px);
        `}
  `),po=d.default(I)(({theme:e})=>n.css`
    line-height: ${e.lineHeights.normal};
  `),ms=d.default.div(({theme:e})=>n.css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: ${e.space[3]};
    margin-bottom: calc(-1 * ${e.space[2]});
  `),ws=d.default.div(({theme:e})=>n.css`
    width: ${e.space[8]};
    height: ${e.space[1]};
    border-radius: ${e.radii.full};
    background: ${e.colors.border};
  `),hs=()=>r.createElement(ms,null,r.createElement(ws,null)),Cs=({onClose:e,title:t,description:o,top:a="4",left:s,right:i="4",bottom:l,state:c,children:u,...g})=>r.createElement(go,{...g,"data-testid":J(g,"toast-desktop"),$bottom:l,$left:s,$mobile:!1,$right:i,$state:c,$top:a},r.createElement(uo,{as:Ce,"data-testid":"close-icon",onClick:()=>e()}),r.createElement(po,{variant:"large",weight:"bold"},t),r.createElement(I,null,o),u&&r.createElement(fo,null,u)),fo=d.default.div(({theme:e})=>n.css`
    margin-top: ${e.space[3]};
    width: 100%;
  `),ys=({onClose:e,open:t,title:o,description:a,left:s,right:i="4",bottom:l,state:c,children:u,popped:g,setPopped:w,...h})=>{const{space:v}=n.useTheme(),m=r.useRef(null),[x,$]=r.useState(.025*window.innerHeight),[C,y]=r.useState([]);r.useEffect(()=>{t&&$(.025*window.innerHeight)},[t]),r.useEffect(()=>{var k;const p=.025*window.innerHeight;if(C.length&&!g){let P=!1,G=C[C.length-1];G===void 0&&(G=C[C.length-2]||0,P=!0);const B=parseInt(getComputedStyle(document.documentElement).fontSize),z=C[0]-G;if(P)parseFloat(v[8])*B>(((k=m.current)==null?void 0:k.offsetHeight)||0)-z?e():($(p),y([]));else if(z*-1>parseFloat(v[32])*B)$(p*2),w(!0);else if(z>0)$(p-z);else{const j=.25*(z^2);$(p-j)}}},[C]);const b=r.useCallback(p=>{var k;p.preventDefault(),y([(k=p.targetTouches.item(0))==null?void 0:k.pageY])},[]),E=r.useCallback(p=>{p.preventDefault(),y(k=>{var P;return[...k,(P=p.targetTouches.item(0))==null?void 0:P.pageY]})},[]);return r.useEffect(()=>{const p=m.current;return p==null||p.addEventListener("touchstart",b,{passive:!1,capture:!1}),p==null||p.addEventListener("touchmove",E,{passive:!1,capture:!1}),()=>{p==null||p.removeEventListener("touchstart",b,{capture:!1}),p==null||p.removeEventListener("touchmove",E,{capture:!1})}},[]),r.useEffect(()=>{const p=m.current;g&&(p==null||p.removeEventListener("touchstart",b,{capture:!1}),p==null||p.removeEventListener("touchmove",E,{capture:!1}))},[g]),r.createElement(go,{...h,"data-testid":J(h,"toast-touch"),style:{top:`${x}px`},onClick:()=>w(!0),onTouchEnd:()=>y(p=>[...p,void 0]),$bottom:l,$left:s,$mobile:!0,$popped:g,$right:i,$state:c,ref:m},r.createElement(po,{variant:"large",weight:"bold"},o),r.createElement(I,null,a),g&&r.createElement(r.Fragment,null,u&&r.createElement(fo,null,u),r.createElement(uo,{as:Ce,"data-testid":"close-icon",onClick:p=>{p.stopPropagation(),e()}})),!g&&r.createElement(hs,null))},ft=({onClose:e,open:t,msToShow:o=8e3,variant:a="desktop",...s})=>{const[i,l]=r.useState(!1),c=r.useRef();return r.useEffect(()=>{if(t)return l(!1),c.current=setTimeout(()=>e(),o||8e3),()=>{clearTimeout(c.current),e()}},[t]),r.useEffect(()=>{i&&clearTimeout(c.current)},[i]),r.createElement(we,{className:"toast",noBackground:!0,open:t,onDismiss:a==="touch"&&i?()=>e():void 0},({state:u})=>a==="touch"?r.createElement(ys,{...s,open:t,popped:i,setPopped:l,state:u,onClose:e}):r.createElement(Cs,{...s,open:t,state:u,onClose:e}))};ft.displayName="Toast";var vs=Object.freeze(Object.defineProperty({__proto__:null,Avatar:Pe,BackdropSurface:Ie,Button:Be,Card:Ue,DynamicPopover:ze,Field:K,FileInput:qe,Heading:He,Portal:je,ScrollBox:sr,Skeleton:Ke,Spinner:me,Tag:Oe,Typography:I,VisuallyHidden:X,Backdrop:we,Checkbox:Je,CountdownCircle:Qe,Dropdown:Fe,FieldSet:et,Helper:nt,Input:at,Modal:ye,PageButtons:ro,Profile:st,RadioButton:it,RadioButtonGroup:lt,Select:dt,SkeletonGroup:Xe,Slider:ut,Textarea:gt,Tooltip:pt,Dialog:ve,Toast:ft,AlertSVG:tt,ArrowCircleSVG:cr,ArrowRightSVG:dr,ArrowUpSVG:ur,BookOpenSVG:gr,CancelCircleSVG:pr,CheckSVG:fr,ChevronDownSVG:br,ChevronLeftSVG:$r,ChevronRightSVG:mr,ChevronUpSVG:wr,CloseSVG:rt,CodeSVG:hr,CogSVG:Cr,CollectionSVG:yr,CopySVG:vr,DocumentsSVG:xr,DotsVerticalSVG:kr,DownIndicatorSVG:he,DuplicateSVG:Er,EthSVG:Sr,EthTransparentSVG:Lr,EthTransparentInvertedSVG:Rr,ExclamationSVG:Tr,ExitSVG:Ce,FlagSVG:Vr,FlameSVG:Mr,FlameBurnedSVG:Pr,GradientSVG:Br,GridSVG:Gr,GridSolidSVG:zr,HandSVG:Hr,InfoSVG:ot,LinkSVG:jr,ListSVG:Or,LockClosedSVG:Fr,LogoSVG:Dr,MenuSVG:Zr,MoonSVG:Ar,PencilSVG:Wr,PlusSVG:Nr,PlusSmallSVG:_r,RefreshSVG:Yr,SearchSVG:Ir,SplitSVG:Ur,SunSVG:qr,TokensSVG:Xr,TrendingUpSVG:Kr,UploadSVG:Jr,UserSolidSVG:Qr,UsersSolidSVG:eo,WalletSVG:to},Symbol.toStringTag,{value:"Module"}));const xs=n.createGlobalStyle(({theme:e})=>n.css`
    *,
    ::before,
    ::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: ${e.fonts.sans};
      border-color: ${e.colors.foregroundSecondary};
      border-style: ${e.borderStyles.solid};
      border-width: 0;
      color: ${e.colors.current};
      font-size: 100%;
      font-feature-settings: 'ss01' on, 'ss03' on;
      vertical-align: baseline;
    }

    [data-js-focus-visible] &:focus:not([data-focus-visible-added]) {
      outline: none;
    }

    html {
      font-size: ${e.fontSizes.root};
      color: ${e.colors.foreground};
      text-rendering: optimizeLegibility;
      background: radial-gradient(
          40.48% 67.6% at 50% 32.4%,
          #ecf4ff 0%,
          #f7f7ff 52.77%,
          #f7f7f7 100%
        ),
        #ffffff;
    }

    body {
      line-height: ${e.lineHeights.none};
    }

    article,
    aside,
    details,
    div,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }

    ul,
    ol {
      list-style: none;
    }

    blockquote {
      quotes: none;

      &::before,
      &::after {
        content: '';
      }
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    fieldset {
      display: block;
      appearance: none;
      outline: none;
      &:placeholder {
        color: ${e.colors.textTertiary};
        opacity: ${e.opacity[100]};
      }
    }

    mark {
      background-color: ${e.colors.transparent};
      color: ${e.colors.inherit};
    }

    select {
      display: block;
      appearance: none;
      outline: none;
      &:placeholder {
        color: ${e.colors.textTertiary};
        opacity: ${e.opacity[100]};
      }

      &:-ms-expand {
        display: none;
      }
    }

    input {
      display: block;
      appearance: none;
      outline: none;
      &:placeholder {
        color: ${e.colors.textTertiary};
        opacity: ${e.opacity[100]};
      }
      &::-webkit-outer-spin-button {
        webkit-appearance: none;
      }
      &::-webkit-inner-spin-button {
        webkit-appearance: none;
      }
      &::-ms-clear {
        display: none;
      }
      &::-webkit-search-cancel-button {
        webkit-appearance: none;
      }
    }

    button {
      background: none;
    }

    a {
      text-decoration: none;
      color: ${e.colors.inherit};
    }
  `);exports.AlertSVG=tt;exports.ArrowCircleSVG=cr;exports.ArrowRightSVG=dr;exports.ArrowUpSVG=ur;exports.Avatar=Pe;exports.Backdrop=we;exports.BackdropSurface=Ie;exports.BookOpenSVG=gr;exports.Button=Be;exports.CancelCircleSVG=pr;exports.Card=Ue;exports.CheckSVG=fr;exports.Checkbox=Je;exports.ChevronDownSVG=br;exports.ChevronLeftSVG=$r;exports.ChevronRightSVG=mr;exports.ChevronUpSVG=wr;exports.CloseSVG=rt;exports.CodeSVG=hr;exports.CogSVG=Cr;exports.CollectionSVG=yr;exports.Components=vs;exports.CopySVG=vr;exports.CountdownCircle=Qe;exports.Dialog=ve;exports.DocumentsSVG=xr;exports.DotsVerticalSVG=kr;exports.DownIndicatorSVG=he;exports.Dropdown=Fe;exports.DuplicateSVG=Er;exports.DynamicPopover=ze;exports.EthSVG=Sr;exports.EthTransparentInvertedSVG=Rr;exports.EthTransparentSVG=Lr;exports.ExclamationSVG=Tr;exports.ExitSVG=Ce;exports.Field=K;exports.FieldSet=et;exports.FileInput=qe;exports.FlagSVG=Vr;exports.FlameBurnedSVG=Pr;exports.FlameSVG=Mr;exports.GradientSVG=Br;exports.GridSVG=Gr;exports.GridSolidSVG=zr;exports.HandSVG=Hr;exports.Heading=He;exports.Helper=nt;exports.InfoSVG=ot;exports.Input=at;exports.LinkSVG=jr;exports.ListSVG=Or;exports.LockClosedSVG=Fr;exports.LogoSVG=Dr;exports.MenuSVG=Zr;exports.Modal=ye;exports.MoonSVG=Ar;exports.PageButtons=ro;exports.PencilSVG=Wr;exports.PlusSVG=Nr;exports.PlusSmallSVG=_r;exports.Portal=je;exports.Profile=st;exports.RadioButton=it;exports.RadioButtonGroup=lt;exports.RefreshSVG=Yr;exports.ScrollBox=sr;exports.SearchSVG=Ir;exports.Select=dt;exports.Skeleton=Ke;exports.SkeletonGroup=Xe;exports.Slider=ut;exports.Spinner=me;exports.SplitSVG=Ur;exports.SunSVG=qr;exports.Tag=Oe;exports.Textarea=gt;exports.ThorinGlobalStyles=xs;exports.Toast=ft;exports.TokensSVG=Xr;exports.Tooltip=pt;exports.TrendingUpSVG=Kr;exports.Typography=I;exports.UploadSVG=Jr;exports.UserSolidSVG=Qr;exports.UsersSolidSVG=eo;exports.VisuallyHidden=X;exports.WalletSVG=to;exports.baseTheme=Me;exports.darkTheme=Ao;exports.lightTheme=Zo;exports.mq=oe;exports.tokens=W;
