// the next auth is is for login... It it not for the user registration
// NextAuth,  in imports, is used for authentication and session management in Next.js applications.


import  {DefaultSession} from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

// You can add additional properties to the `User` interface if needed
