import { AuthDetailsFragment } from "./fragments";
import gql from "graphql-tag";

export default {
  LOG_IN: gql`
    mutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        ...AuthDetails
      }
    }
    ${AuthDetailsFragment}
  `,

  SIGN_UP: gql`
    mutation($email: String!, $password: String!, $name: String!) {
      signup(email: $email, password: $password, name: $name) {
        ...AuthDetails
      }
    }
    ${AuthDetailsFragment}
  `
};
