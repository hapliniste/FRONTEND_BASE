import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import * as jsonwebtoken from "jsonwebtoken";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // Add other providers if needed
    ],
    adapter: HasuraAdapter({
        endpoint: process.env.HASURA_PROJECT_ENDPOINT!,
        adminSecret: process.env.HASURA_ADMIN_SECRET!,
    }),
    theme: {
        colorScheme: "auto",
    },
    // Use JWT strategy so we can forward them to Hasura
    session: { strategy: "jwt" },
    // Encode and decode your JWT with the HS256 algorithm
    jwt: {
        encode: ({ secret, token }) => {
            //console.log("JWT ENCODE: ", token);
            const encodedToken = jsonwebtoken.sign(token!, secret, {
                algorithm: "HS256",
            });
            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            //console.log("JWT DECODE: ", token);
            const decodedToken = jsonwebtoken.verify(token!, secret, {
                algorithms: ["HS256"],
            });
            return decodedToken as JWT;
        },
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            /*console.log("SIGNIN - USER: ", user);
            console.log("SIGNIN - ACCOUNT: ", account);
            console.log("SIGNIN - PROFILE: ", profile);*/
            return true;
        },
        async jwt({ token, account }) {
            token["https://hasura.io/jwt/claims"] = {
                "x-hasura-allowed-roles": ["user"],
                "x-hasura-default-role": "user",
                "x-hasura-role": "user",
                "x-hasura-user-id": token.sub,
            };

            return token;
        },

        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.sub!;
            }
            const encodedToken = jsonwebtoken.sign(token, process.env.NEXTAUTH_SECRET, {
                algorithm: "HS256",
            });
            session.accessToken = encodedToken;

            return session;
        },
    },
};

export default NextAuth(authOptions);
