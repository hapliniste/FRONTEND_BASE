import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getSession } from "next-auth/react";

// GraphQL query to fetch the user's name based on their ID
const GET_USER_NAME = gql`
    query GetUserName($id: uuid!) {
        users_by_pk(id: $id) {
            name
        }
    }
`;

const Test3Page: React.FC = () => {
    const [name, setName] = useState<string | null>(null);
    const { data: sessionData } = useSession();
    const userID = sessionData?.user?.id;

    // Execute the query using Apollo Client's useQuery hook
    const { data, loading, error } = useQuery(GET_USER_NAME, {
        variables: { id: userID },
        skip: !userID || !sessionData?.accessToken, // Skip the query if userID or accessToken is not available
        context: {
            headers: {
                authorization: sessionData?.accessToken
                    ? `Bearer ${sessionData.accessToken}`
                    : "",
            },
        },
    });

    useEffect(() => {
        if (!sessionData?.accessToken) {
            getSession().then((newSession) => {
                if (newSession?.accessToken) {
                    // Here, you can update a local state or trigger the Apollo Client query again
                }
            });
        }
    }, []);

    useEffect(() => {
        if (data?.users_by_pk?.name) {
            setName(data.users_by_pk.name);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>This is a page using Apollo Client to fetch data.</p>
            <p>{sessionData?.accessToken}</p>
            <p>{userID}</p>
        </div>
    );
};

export default Test3Page;
