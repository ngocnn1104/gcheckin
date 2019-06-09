import gql from "graphql-tag";

export const UserDetailsFragment = gql`
  fragment UserDetails on User {
    id
    email
    name
    role
  }
`;

export const AuthDetailsFragment = gql`
  fragment AuthDetails on AuthPayload {
    token
    user {
      ...UserDetails
    }
  }
  ${UserDetailsFragment}
`;

export const EventDetailsFragment = gql`
  fragment EventDetails on Event {
    id
    name
    createdAt
    updatedAt
    startAt
    endAt
    isPaid
    maxSeats
    createdBy {
      ...UserDetails
    }
    status
  }
  ${UserDetailsFragment}
`;
