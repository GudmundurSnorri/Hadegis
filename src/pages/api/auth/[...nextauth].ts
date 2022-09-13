import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

type CredentialsType = {
  email: string;
  password: string;
};
export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        
        session.user.id = token.uid as string;
      }
      return session;
    },
     jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    /*
    GoogleProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    */
    // ...add more providers here
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "me@myemail.com" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as CredentialsType;

        const getUserByEmail = await prisma.user.findFirstOrThrow({
          where: {
            email,
          },
        });
        return getUserByEmail;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
