import NextAuth, { DefaultSession, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

// When you define a /pages/api/auth/[...nextauth] JS/TS file,
// you instruct NextAuth.js that every API request beginning with /api/auth/*
// should be handled by the code written in the [...nextauth] file.

export interface MySession extends DefaultSession {
  user?: Session["user"] & {
    id?: string;
  };
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    //if we have others providers, (ex. sign in with FB) here is the place to put them
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });

      const mySession: MySession = session;
      if (mySession.user) {
        mySession.user.id = sessionUser._id.toString();
      }

      return mySession;
    },
    async signIn({ profile, account, user, credentials }) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({ email: profile?.email });

        //if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.image,
          });
        }
        return true;
      } catch (error) {
        const result = error as Error;
        console.log("Error checking if user exists: ", result.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

// Internally, NextAuth.js detects that it is being initialized in a Route Handler
//  (by understanding that it is passed a Web Request instance), and will
//  return a handler that returns a Response instance.
//  A Route Handler file expects you to export some
//  named handler functions that handle a request
//  and return a response. NextAuth.js needs the
//  GET and POST handlers to function properly, so we export those two.
