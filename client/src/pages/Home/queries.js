import { gql } from "@apollo/client";

const eventFragment = gql`
  fragment EventFragment on Event {
    id
    title
    desc
    date
  }
`;

export const GET_EVENTS = gql`
  query listAllEvents {
    events {
      ...EventFragment
    }
  }
  ${eventFragment}
`;

export const EVENT_SUBSCRIPTION = gql`
  subscription {
    eventCreated {
      ...EventFragment
    }
  }
  ${eventFragment}
`;

export const NEW_EVENT_MUTATION = gql`
  mutation addEvent($data: AddEvent!) {
    addEvent(data: $data) {
      id
    }
  }
`;

export const GET_ALL_USER = gql`
  query getAllUsers {
    users {
      id
      username
    }
  }
`;

export const GET_ALL_LOCATION = gql`
  query getAllLocation {
    locations {
      id
      name
    }
  }
`;
