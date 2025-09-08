import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";
import { dbConnector } from "./db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Enter your name" },
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(`Some field is missing: ${credentials?.email} ${credentials?.password}`);
        }

        try {
          await dbConnector();

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error(`User not found with email ${credentials.email}`);
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            if (!isPasswordValid) { 
            throw new Error("Invalid password!");
          }

          // 👇 return user object to save in session
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };


        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error(`Internal server error: ${error}`);
          return null;
        }
      },
    }),
//   GitHubProvider({
//     clientId: process.env.GITHUB_ID!,
//     clientSecret: process.env.GITHUB_SECRET!,
//   }),
  ],
// callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages:{
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  session:{
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  
};
