import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [LinkedIn, Google],

  // callbacks: {
  //   async jwt({ token, account }) {
  //     // When a new account is created, store access_token in the token object
  //     if (account?.access_token) {
  //       token.access_token = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Pass the access_token to the session
  //     session.access_token = token.access_token as string | undefined;
  //     return session;
  //   },
  // },
});


