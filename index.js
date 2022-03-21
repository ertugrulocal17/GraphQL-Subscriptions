const { GraphQLServer, PubSub } = require('graphql-yoga');
const { nanoid } = require('nanoid');

const { users, participants, locations, events } = require('./data');

const typeDefs = `
  # User
  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }
  input AddUserInput {
    username: String!
    email: String!
  }
  input UpdateUser {
    username: String
    email: String
  }

  # Event
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
    user: User
    location: Location
    participants: [Participant!]!
  }
  input AddEvent {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }
  input UpdateEvent {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }

  # Location
  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  input AddLocation {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  input UpdateLocation {
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  # Participant
  type Participant {
    id: ID!
    user_id: Int!
    event_id: Int!
  }
  input AddParticipant {
    user_id: ID!
    event_id: ID!
  }
  input UpdateParticipant {
    user_id: ID
    event_id: ID
  }
  type DeleteAllOutput {
    count: Int!
  }
  type Query {
    #User
    users: [User!]!
    user(id: ID!): User!
    #Event
    events: [Event!]!
    event(id: ID!): Event!
    #Location
    locations: [Location!]!
    location(id: ID!): Location!
    #Participant
    participants: [Participant!]!
    participant(id: ID!): Participant!
  }
  type Mutation {
    # User
    addUser(data: AddUserInput!): User!
    updateUser(id: ID!, data: UpdateUser!): User!
    deleteUser(id: ID!): User!
    deleteAllUser: DeleteAllOutput!
    
    # Event
    addEvent(data: AddEvent!): Event!
    updateEvent(id: ID!, data: UpdateEvent!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvent: DeleteAllOutput!
    
    # Location
    addLocation(data: AddLocation!): Location!
    updateLocation(id: ID!, data: UpdateLocation!): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocation: DeleteAllOutput!
    
    # Participant
    addParticipant(data: AddParticipant!): Participant!
    updateParticipant(id: ID!, data: UpdateParticipant!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipant: DeleteAllOutput!
  }

  type Subscription{
    userCreated:User!
    eventCreated:Event!
    participantAdded:Participant!
  }
`;

const resolvers = {
  Subscription: {
    userCreated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userCreated'),
    },
    eventCreated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('eventCreated'),
    },
    participantAdded: {
      subscribe: (_, __, { pubsub }) =>
        pubsub.asyncIterator('participantAdded'),
    },
  },

  Mutation: {
    // User
    addUser: (parent, { data }, { pubsub }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      pubsub.publish('userCreated', { userCreated: user });
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex(user => user.id === id);
      if (user_index === -1) {
        throw new Error('User is not found!');
      }
      const updatedUser = (users[user_index] = {
        ...users[user_index],
        ...data,
      });
      return updatedUser;
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex(user => user.id === id);
      if (user_index === -1) {
        throw new Error('User is not found!');
      }
      const deletedUser = users[user_index];
      users.splice(user_index, 1);
      return deletedUser;
    },
    deleteAllUser: () => {
      const length = users.length;
      users.splice(0, length);
      return {
        count: length,
      };
    },
    // Event
    addEvent: (parent, { data }, { pubsub }) => {
      const event = {
        id: nanoid(),
        ...data,
      };
      events.push(event);
      pubsub.publish('eventCreated', { eventCreated: event });
      return event;
    },
    updateEvent: (parent, { id, data }) => {
      const event_index = events.findIndex(event => event.id === id);
      if (event_index === -1) {
        throw new Error('Event is not found!');
      }
      const updatedEvent = (events[event_index] = {
        ...events[event_index],
        ...data,
      });
      return updatedEvent;
    },
    deleteEvent: (parent, { id }) => {
      const event_index = events.findIndex(event => event.id === id);
      if (event_index === -1) {
        throw new Error('Event is not found!');
      }
      const deletedEvent = events[event_index];
      events.splice(event_index, 1);
      return deletedEvent;
    },
    deleteAllEvent: () => {
      const length = events.length;
      events.splice(0, length);
      return {
        count: length,
      };
    },
    // Location
    addLocation: (parent, { data }) => {
      const location = { id: nanoid(), ...data };
      locations.push(location);
      return location;
    },
    updateLocation: (parent, { id, data }) => {
      const location_index = locations.findIndex(
        location => location.id === id
      );
      if (location_index === -1) {
        throw new Error('Location is not found');
      }
      const updatedLocation = (locations[location_index] = {
        ...locations[location_index],
        ...data,
      });
      return updatedLocation;
    },
    deleteLocation: (parent, { id }) => {
      const location_index = locations.findIndex(
        location => location.id === id
      );
      if (location_index === -1) {
        throw new Error('Location is not found!');
      }
      const deletedLocation = locations[location_index];
      locations.splice(location_index, 1);
      return deletedLocation;
    },
    deleteAllLocation: () => {
      const length = locations.length;
      locations.splice(0, length);
      return {
        count: length,
      };
    },
    // Participant
    addParticipant: (parent, { data }, { pubsub }) => {
      const participant = { id: nanoid(), ...data };
      participants.push(participant);
      pubsub.publish('participantAdded', { participantAdded: participant });
      return participant;
    },
    updateParticipant: (parent, { id, data }) => {
      const participant_index = participants.findIndex(
        participant => participant.id === id
      );
      if (participant_index === -1) {
        throw new Error('Participant is not found!');
      }
      const updatedParticipant = (participants[participant_index] = {
        ...participants[participant_index],
        ...data,
      });
      return updatedParticipant;
    },
    deleteParticipant: (parent, { id }) => {
      const participant_index = participants.findIndex(
        participant => participant.id === id
      );
      if (participant_index === -1) {
        throw new Error('Participant is not found!');
      }
      const deletedParticipant = participants[participant_index];
      participants.splice(participant_index, 1);
      return deletedParticipant;
    },
    deleteAllParticipant: () => {
      const length = participants.length;
      participants.splice(0, length);
      return {
        count: length,
      };
    },
  },

  Query: {
    events: () => events,
    event: (parent, args) => events.find(event => event.id === args.id),

    users: () => users,
    user: (parent, args) => users.find(user => user.id === args.id),

    locations: () => locations,
    location: (parent, args) =>
      locations.find(location => location.id === args.id),

    participants: () => participants,
    participant: (parent, args) =>
      participants.find(participant => participant.id === args.id),
  },
  Event: {
    user: (parent, arg) => users.find(user => user.id === parent.user_id),
    location: (parent, arg) =>
      locations.find(location => location.id === parent.location_id),
    participants: (parent, args) =>
      participants.filter(participant => participant.event_id === parent.id),
  },
  User: {
    events: parent => events.filter(event => event.user_id === parent.id),
  },
};

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log('Server is running on localhost 4000'));
