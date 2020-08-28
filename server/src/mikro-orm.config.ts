import { Post } from '../entities/Post';
import { Users } from '../entities/Users';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post, Users], // Tables
  dbName: 'redditclone', // Datebase Name
  user: 'postgres',
  password: 'Al475500',
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'prodiction',
} as Parameters<typeof MikroORM.init>[0];
