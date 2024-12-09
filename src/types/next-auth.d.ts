import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
    accessToken?: string;
  }

  interface JWT {
    'https://hasura.io/jwt/claims'?: {
      'x-hasura-allowed-roles': string[];
      'x-hasura-default-role': string;
      'x-hasura-role': string;
      'x-hasura-user-id': string;
    };
    name?: string;
    email?: string;
    picture?: string;
    sub?: string;
    accessToken?: string;
  }
}
