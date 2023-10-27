// src/types/next-auth.d.ts

/*
// https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1932922
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
*/

import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
    accessToken?: string;
  }

  interface JWT {
    "https://hasura.io/jwt/claims"?: {
      "x-hasura-allowed-roles": string[];
      "x-hasura-default-role": string;
      "x-hasura-role": string;
      "x-hasura-user-id": string;
    };
    name?: string;
    email?: string;
    picture?: string;
    sub?: string;
    accessToken?: string;
  }
}
