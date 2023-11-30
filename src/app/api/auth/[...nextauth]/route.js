import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_REFRESH_TOKEN_LIFETIME = 90 * 24 * 60 * 60;
const SIGN_IN_HANDLERS = {
  credentials: async (user, account, profile, email, credentials) => {
    return true;
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch("https://ihl-project-606adf7a8500.herokuapp.com/auth/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const user = await res.json();

          // If no error and we have user data, return it
          if (res.status === 200 && user && user.token && user.user) {
            return user;
          } else {
            throw new Error("Invalid response from authentication API");
          }
        } catch (error) {
          // Handle error here
          return { error: "Invalid credentials" };
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      return SIGN_IN_HANDLERS[account.provider](
        user,
        account,
        profile,
        email,
        credentials
      );
    },
    async jwt({ user, token, account }) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        let backendResponse = account.provider === "credentials" ? user : account.meta;

        if (backendResponse && backendResponse.user && backendResponse.token) {
          token.user = backendResponse.user;
          token.token = backendResponse.token;
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
    jwt: true,
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export async function generateStaticParams() {
//   const staticParams = [
//     {
//       nextauth: ["31"],
//     },
//   ];
//   return staticParams;
// }
