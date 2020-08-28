import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
// import { Post } from '../../entities/Post';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig); //Passing in db info
  await orm.getMigrator().up(); // Automatically runs migrations

  const app = express();

  // Setting up graphQL
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver], // "QURIES"
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  // This Creates a Graphql End Point
  // http://localhost:4000/graphql to get to graphql playground
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server is running');
  });
};

main();

console.log('Hello World');
