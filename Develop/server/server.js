const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('apollo-server-express')
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(expressMiddleware({
  app: app,
  path: '/graphql'
}));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is now running on http://localhost:${PORT}`);
    console.log(`🚀 Apollo Server is now running on http://localhost:${PORT}${server.graphqlPath}`);
  });
});


startApolloServer();