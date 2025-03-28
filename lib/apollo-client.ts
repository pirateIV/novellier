import { ApolloClient, InMemoryCache } from "@apollo/client";

const opts = {
  cache: new InMemoryCache(),
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/graphql"
      : "https://novellier.vercel.app/api/graphql",
};
const client = new ApolloClient(opts);

export default client;
