import { AuthDetailsFragment } from "./fragments";
import gql from "graphql-tag";

export default {
  LOG_IN: variables => ({
    mutation: gql`
      mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          ...AuthDetails
        }
      }
      ${AuthDetailsFragment}
    `,
    variables
  }),

  SIGN_UP: variables => ({
    mutation: gql`
      mutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
          ...AuthDetails
        }
      }
      ${AuthDetailsFragment}
    `,
    variables
  })
};
