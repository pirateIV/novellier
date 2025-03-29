// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  const uri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/graphql"
      : "https://novellier.vercel.app/api/graphql";

  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Enable SSR mode
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient();
export default client;