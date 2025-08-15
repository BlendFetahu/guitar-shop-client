import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apollo = new ApolloClient({
  link: new HttpLink({ uri: "https://graphql-api-brown.vercel.app/api/graphql" }),
  cache: new InMemoryCache(),
});