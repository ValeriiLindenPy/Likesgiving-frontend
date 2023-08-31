import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import api from "../baseaxios"

const BACKEND_REFRESH_TOKEN_LIFETIME = 90 * 24 * 60 * 60;
const SIGN_IN_HANDLERS = {
  "credentials": async (user, account, profile, email, credentials) => {
    return true;
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

const handler = NextAuth({

  providers: [
    CredentialsProvider({

      name: 'Credentials',

      credentials: {
        username: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials, req) {
        try {
          const res = await api.post("auth/login/", credentials, {
            headers: { "Content-Type": "application/json" }
          });

          const user = res.data; // Access the response data directly

          // If no error and we have user data, return it
          if (res.status === 200 && user && user.token && user.user) {
            return user;
          } else {
            throw new Error("Invalid response from authentication API");
          }

          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          // Handle error here
          return { error: "Invalid credentials" };
        }


      }
    }),

  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      return SIGN_IN_HANDLERS[account.provider](
        user, account, profile, email, credentials
      );
    },
    async jwt({ user, token, account }) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        let backendResponse = account.provider === "credentials" ? user : account.meta;

        if (backendResponse && backendResponse.user && backendResponse.token) {
          token["user"] = backendResponse.user;
          token["token"] = backendResponse.token;
        } else {
          throw new Error("Invalid backend response for JWT token generation");
        }

        return token;
      }

      return token;
    },

    async session({ token }) {
      return token;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },

})

export { handler as GET, handler as POST }