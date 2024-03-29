import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import VueApollo from "vue-apollo";
import Vue from "vue";

Vue.use(VueApollo);

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://34.67.147.26:4000/"
});

// Includes token to every request header
// IMPORTANT: without setContext, new token won't be added to header
const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem("apollo-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: true
  })
});

export default new VueApollo({
  defaultClient: client
});
