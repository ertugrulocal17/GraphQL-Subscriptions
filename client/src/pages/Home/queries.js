import { gql } from "@apollo/client";
export const GET_EVENTS = gql`
  query listAllEvents {
    events {
      id
      title
      desc
      date
    }
  }
`;
