import { ApolloClient, InMemoryCache } from "@apollo/client";

const opts = {
  cache: new InMemoryCache(),
  uri: "http://localhost:3000/api/graphql",
};
const client = new ApolloClient(opts);

export default client;
