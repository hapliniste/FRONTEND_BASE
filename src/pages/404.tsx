// pages/404.tsx
import React from 'react';
import { withTranslation } from "@/utils/withTranslation";
import { useTranslation } from "next-i18next";
import styled from 'styled-components';
import Link from "next/link";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${({ theme }) => theme.sizes.appBarHeight} - ${({ theme }) => theme.sizes.footerHeight});
  padding: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.accent.primary};
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BackButton = styled(Link)`
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.accent.primary};
  color: ${({ theme }) => theme.colors.basic.white};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borders.radiusLarge};
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent.light};
  }
`;

const NotFoundPage = () => {
  const { t } = useTranslation("404");
  return (
    <NotFoundContainer>
      <Title>{t("title")}</Title>
      <Message>{t("description")}</Message>
      <BackButton href="/">{t("goHomeButton")}</BackButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
export const getStaticProps = withTranslation(['common', '404']);