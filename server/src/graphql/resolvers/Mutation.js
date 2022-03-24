const { nanoid } = require('nanoid');
const Mutation = {
  // User
  addUser: (parent, { data }, { pubsub, db }) => {
    const user = { id: nanoid(), ...data };
    db.users.push(user);
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
  addEvent: (parent, { data }, { pubsub, db }) => {
    const event = {
      id: nanoid(),
      ...data,
    };
    db.events.push(event);
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
    const location_index = locations.findIndex(location => location.id === id);
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
    const location_index = locations.findIndex(location => location.id === id);
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
  addParticipant: (parent, { data }, { pubsub, db }) => {
    const participant = { id: nanoid(), ...data };
    db.participants.push(participant);
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
};

module.exports = Mutation;
