import React from "react";
import LoginForm from "@/components/loginForm/nextauthForm";
import UserButton from '@/components/layout/userButton/UserButton';
import { withTranslation } from "@/utils/withTranslation";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import styled from "styled-components";
import Link from "next/link";

import LocalizedComponent from "@/components/testing/localization/LocalizedComponent";
import LocalizedComponent2 from "@/components/testing/localization2/LocalizedComponent2";

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

const SpacerDiv = styled.div`
    height: 5em;
`;

export default function Profile() {

    const router = useRouter();

        
    // Add these debug lines
    console.log('All ENV:', process.env);
    console.log('NEXT_PUBLIC_HASURA_URL:', process.env.NEXT_PUBLIC_HASURA_URL);
    
    const hasuraUrl = process.env.NEXT_PUBLIC_HASURA_URL;

    
    return (
        <>
            <SpacerDiv />

            <LoginForm />

            <h1>Profile</h1>
            <p>Current locale: {router.locale}</p>

            <p>Hasura URL: {hasuraUrl || 'Not loaded'}</p>

        </>
    );
}

export const getServerSideProps = async (context) => {
    const hasuraUrl = process.env.NEXT_PUBLIC_HASURA_URL;
    
    return {
        props: {
            ...(await withTranslation(['404', 'common'])(context)).props,
            hasuraUrl: hasuraUrl || null,
        },
    };
};
