// pages/TestPage.tsx

import { InMemoryCache, gql, HttpLink } from "@apollo/client";
//import client from "@/utils/apolloClient";
import { useQuery } from "@apollo/client";
import React from "react";
import Cookie from "js-cookie";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/loginForm/nextauthForm";

// GraphQL query to fetch the user's name based on their ID
const GET_USER_NAME = gql`
    query GetUserName($id: uuid!) {
        users_by_pk(id: $id) {
            name
        }
    }
`;

const TestPage: React.FC = () => {
    const { data: session } = useSession();

    // Fetch data using the Apollo Client
    const { loading, error, data } = useQuery(GET_USER_NAME, {
        variables: { id: session?.user?.id }//,
        //client: client,
    });

    if (loading) return <p>Loading...</p>;
    if (error)
        return (
            <div>
                <p>Error: {error.message}</p>
                <LoginForm />
            </div>
        );

    return (
        <div>
            <p>User Name: {data.users_by_pk.name}</p>
            <LoginForm />
        </div>
    );
};

export default TestPage;
