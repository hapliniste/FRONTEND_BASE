// pages/404.tsx
import { withTranslation } from "@/utils/withTranslation";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import Link from "next/link";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${({ theme }) => theme.appBarHeight} - ${({ theme }) => theme.footerHeight});
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.primaryColor};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 2rem;
  text-align: center;
`;

const GoHomeButton = styled(Link)`
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.white};
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accentColor};
  }
`;

const NotFoundPage = () => {
  const { t } = useTranslation("404");

  return (
    <PageContainer>
      <Title>{t("title")}</Title>
      <Description>{t("description")}</Description>
      <GoHomeButton href="/">{t("goHomeButton")}</GoHomeButton>
    </PageContainer>
  );
};

export default NotFoundPage;
export const getStaticProps = withTranslation(['common', '404']);
