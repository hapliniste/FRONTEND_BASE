import React from 'react';
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { request, gql } from "graphql-request";
import type { GetServerSideProps } from "next";

type TestProps = {
  content: string;
};
type GraphQLResponse = {
    users_by_pk: {
      name: string;
    } | null;
  };

const TestPage: React.FC<TestProps> = ({ content }) => {
  return (
    <div>
      <h1>Protected Content</h1>
      <p>{content}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const secret = process.env.NEXTAUTH_SECRET;

    const token = await getToken({
      req: context.req,
      secret,
      // Raw gives the un-decoded JWT
      raw: true,
    });

    const query = gql`
      query GetUserName($id: uuid!) {
        users_by_pk(id: $id) {
          name
        }
      }
    `;

    const { users_by_pk: user } = await request<GraphQLResponse>(
      process.env.HASURA_PROJECT_ENDPOINT!,
      query,
      { id: session.user?.id },
      { authorization: `Bearer ${token}` }
    );

    return {
      props: {
        content: `This is protected content. Your name is ${user.name}`,
      },
    };
  } else {
    return {
      props: {
        content: "You must be signed in to view the protected content on this page.",
      },
    };
  }
};

export default TestPage; // This remains the same as before
