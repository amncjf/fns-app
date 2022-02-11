import { SearchInput } from "@app/components/SearchInput";
import { Basic } from "@app/layouts/Basic";
import mq from "@app/mediaQuery";
import { Box, Stack, Typography, vars } from "@ensdomains/thorin";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import styled from "styled-components";

const GradientTitle = styled.h1`
  font-size: ${vars.fontSizes.headingTwo};
  text-align: center;
  font-weight: 800;
  background-image: ${vars.mode.gradients.accent};
  background-repeat: no-repeat;
  background-size: 110%;
  background-clip: text;
  color: transparent;
  margin: 0;

  ${mq.small.min`
    font-size: ${vars.fontSizes.headingOne};
  `}
`;

const SubtitleWrapper = styled(Box)`
  max-width: calc(${vars.space["72"]} * 2 - ${vars.space["4"]});
  line-height: 150%;
  text-align: center;
  margin-bottom: ${vars.space["3"]};
`;

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <Basic>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        flexGrow={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="full"
      >
        <Stack align="center" justify="center" space="3">
          <GradientTitle>{t("title")}</GradientTitle>
          <SubtitleWrapper>
            <Typography size="large" color="textSecondary" lineHeight="1.5">
              {t("description")}
            </Typography>
          </SubtitleWrapper>
          <SearchInput />
        </Stack>
      </Box>
    </Basic>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}

export default Home;
