import gql from "graphql-tag";
import { EventDetailsFragment } from "./fragments";

export default {
  CREATE: variables => ({
    mutation: gql`
      mutation($name: String!, $startAt: String!, $maxSeats: Int!) {
        createEvent(name: $name, startAt: $startAt, maxSeats: $maxSeats) {
          ...EventDetails
        }
      }
      ${EventDetailsFragment}
    `,
    variables
  }),

  GET: {
    query: gql`
      query {
        events {
          ...EventDetails
        }
      }
      ${EventDetailsFragment}
    `,
    fetchPolicy: "network-only"
  },

  UPDATE: variables => ({
    mutation: gql`
      mutation(
        $id: String!
        $name: String
        $startAt: String
        $maxSeats: Int
        $status: String
        $isPaid: Boolean
        $endAt: String
      ) {
        updateEvent(
          id: $id
          name: $name
          startAt: $startAt
          maxSeats: $maxSeats
          status: $status
          isPaid: $isPaid
          endAt: $endAt
        ) {
          ...EventDetails
        }
      }
      ${EventDetailsFragment}
    `,
    variables
  })
};
