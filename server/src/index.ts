import { MikroORM } from '@mikro-orm/core';
import { Post } from '../entities/Post';

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: 'redditclone',
    user: 'postgres',
    password: 'Al475500',
    type: 'postgresql',
    debug: process.env.NODE_ENV !== 'prodiction',
  });

  const post = orm.em.create(Post, { title: 'My First Post' });
  await orm.em.persistAndFlush(post);
};

main();

console.log('Hello World');
