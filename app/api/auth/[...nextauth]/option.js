import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import User from "@/(models)/User";

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {

        let userRole = "test@gmail.com";
        if (profile?.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL) userRole = "admin";
        else userRole = "user";

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        // console.log("Profile Google: ", profile);

        let userRole = "test@gmail.com";
        if (profile?.email == "anandmanash321@gmail.com") userRole = "admin";
        else userRole = "user";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.Google_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your password",
        },
      
      },
      async authorize(credentials) {
        try {
            const { email, password, number } = credentials;
            console.log("working")
          const foundUser = await User.findOne({ email })
            .lean()
            .exec();
          if (foundUser) {
            console.log("user exists");
            const match = await bcrypt.compare(
              password,
              foundUser.password
            );
            if (match) {
              console.log("Good pass");
              delete foundUser.password;
            }

            foundUser["role"] = "Unverified User";
            return foundUser;
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.role = token.role;
      return session;
    },
  },
};