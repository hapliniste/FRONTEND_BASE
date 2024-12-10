import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import { HasuraAdapter } from 'next-auth-hasura-adapter';
import * as jsonwebtoken from 'jsonwebtoken';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  debug: true, // Enable debug messages
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_PROJECT_ENDPOINT!,
    adminSecret: process.env.HASURA_ADMIN_SECRET!,
  }),
  theme: {
    colorScheme: 'auto',
  },
  session: { strategy: 'jwt' },
  jwt: {
    encode: ({ secret, token }) => {
      //console.log("JWT ENCODE - Input token:", token);
      const encodedToken = jsonwebtoken.sign(token!, secret, {
        algorithm: 'HS256',
      });
      //console.log("JWT ENCODE - Encoded successfully");
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      //console.log("JWT DECODE - Starting decode");
      try {
        const decodedToken = jsonwebtoken.verify(token!, secret, {
          algorithms: ['HS256'],
        });
        //console.log("JWT DECODE - Decoded successfully");
        return decodedToken as JWT;
      } catch (error) {
        //console.error("JWT DECODE - Error:", error);
        throw error;
      }
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      /*console.log("SIGNIN CALLBACK - User:", user);
      console.log("SIGNIN CALLBACK - Account:", account);
      console.log("SIGNIN CALLBACK - Profile:", profile);*/
      return true;
    },
    async jwt({ token, account, user }) {
      /*console.log("JWT CALLBACK - Initial token:", token);
      console.log("JWT CALLBACK - Account:", account);
      console.log("JWT CALLBACK - User:", user);*/  

      token['https://hasura.io/jwt/claims'] = {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-role': 'user',
        'x-hasura-user-id': token.sub,
      };

      /*console.log("JWT CALLBACK - Modified token:", token);*/
      return token;
    },
    session: async ({ session, token }) => {
      /*console.log("SESSION CALLBACK - Initial session:", session);
      console.log("SESSION CALLBACK - Token:", token);*/

      if (session?.user) {
        session.user.id = token.sub!;
      }
      
      try {
        const encodedToken = jsonwebtoken.sign(token, process.env.NEXTAUTH_SECRET!, {
          algorithm: 'HS256',
        });
        session.accessToken = encodedToken;
        /*console.log("SESSION CALLBACK - Session modified successfully");*/
      } catch (error) {
        /*console.error("SESSION CALLBACK - Error encoding token:", error);*/
        throw error;
      }

      /*console.log("SESSION CALLBACK - Final session:", session);*/  
      return session;
    },
  },
};

export default NextAuth(authOptions);
