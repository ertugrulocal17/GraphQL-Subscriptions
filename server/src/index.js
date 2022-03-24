const { GraphQLServer, PubSub } = require('graphql-yoga');

const db = require('./data');

const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: `${__dirname}/graphql/schema.graphql`,
  resolvers,
  context: { pubsub, db },
});

server.start(() => console.log('Server is running on localhost 4000'));
