import gql from "graphql-tag";
import { EventDetailsFragment } from "./fragments";

export default {
  CREATE: gql`
    mutation($name: String!, $startAt: String!, $maxSeats: Int!) {
      createEvent(name: $name, startAt: $startAt, maxSeats: $maxSeats) {
        ...EventDetails
      }
    }
    ${EventDetailsFragment}
  `
};
