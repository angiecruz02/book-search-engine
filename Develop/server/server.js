const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();



// Asynchronously start Apollo Server
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Apply Apollo Server as middleware to a specific GraphQL endpoint, for example, '/graphql'
  server.applyMiddleware({ app, path: '/graphql' });

  // If we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is now running on http://localhost:${PORT}`);
      console.log(`🚀 Apollo Server is now running on http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
