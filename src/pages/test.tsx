import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { request, gql } from "graphql-request";

import LoginForm from "@/components/loginForm/nextauthForm";

const ProtectedPage = () => {
  const { data: session } = useSession();
  
  if (!session) {
    return(
        <div>
            <div>You must be signed in to view this page.</div>
            <LoginForm />
        </div>
    );
  }

  return (
    <div>
      <p>Your ID is: {session.user?.id}</p>
      <LoginForm />
    </div>
  );
};

export default ProtectedPage;
