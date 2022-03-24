const Subscription = {
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userCreated'),
  },
  eventCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('eventCreated'),
  },
  participantAdded: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('participantAdded'),
  },
};

module.exports = Subscription;
