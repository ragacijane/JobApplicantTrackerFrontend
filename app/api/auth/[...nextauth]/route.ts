
import { Backend_URL } from "@/config/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Credentials option which will automaticly be created sign in page with next-auth
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password", placeholder: "password", },
      },
      // signin button-> username and password will be in credentials object and will be passed to authorize function
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        // if user is not authenticated
        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      // if user is available we embed the user object into the token,
      // so that user data can be received by the session callback
      if (user) return { ...user, ...token };


      if (new Date().getTime() < token.backendTokens.expiresIn) {


        return token;
      }

      return await refreshToken(token);
    },
    // every time the session will be get by the use session hook or get server session function
    // the session callback will be called
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// common misstake is to export handler instead of authOptions object and then 
// when we try to use this handler as the parameter of get server session,
//we will not get server session from the get server session function of the next-auth

const handler = NextAuth(authOptions);

// if we want to acces to the next-auth session in the server
//components we can use the get server function from the next-auth
//and that function will require authOptions as its argument so we need
//to export it from this file and later we can use it in the get server session function

export { handler as GET, handler as POST };