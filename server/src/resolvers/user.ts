import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Users } from '../../entities/Users';
import { MyContext } from 'src/types';

@Resolver()
export class UserResolver {
  @Query(() => String)
  userTest() {
    return 'Hello World';
  }

  //Create User
  @Mutation(() => Users)
  async register(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { em }: MyContext,
  ): Promise<Users> {
    const user = em.create(Users, { username, password });
    await em.persistAndFlush(user);
    return user;
  }

  // Get All Users
  @Query(() => [Users])
  users(@Ctx() { em }: MyContext): Promise<Users[]> {
    return em.find(Users, {});
  }

  // Get User by ID
  @Query(() => Users, { nullable: true })
  async userByID(
    @Arg('id', () => Number) id: number,
    @Ctx() { em }: MyContext,
  ): Promise<Users | null> {
    return await em.findOne(Users, { id });
  }

  // Get User by Username
  @Query(() => Users, { nullable: true })
  userByUsername(
    @Arg('username') username: string,
    @Ctx() { em }: MyContext,
  ): Promise<Users | null> {
    return em.findOne(Users, { username: username });
  }
  // Update Username and password
  @Mutation(() => Users, { nullable: true })
  async updateUser(
    @Arg('currentUserName') currentUserName: string,
    @Arg('newUserName', { nullable: true }) newUserName: string,
    @Arg('newPassword', { nullable: true }) newPassword: string,
    @Ctx() { em }: MyContext,
  ): Promise<Users | null> {
    const user = await em.findOne(Users, { username: currentUserName });

    if (!user) {
      return null;
    }

    if (typeof newUserName != 'undefined' && typeof newPassword != 'undefined') {
      user.username = newUserName;
      user.password = newPassword;

      await em.persistAndFlush(user);
    } else if (typeof newUserName != 'undefined') {
      user.username = newUserName;

      await em.persistAndFlush(user);
    } else if (typeof newPassword != 'undefined') {
      user.password = newPassword;

      await em.persistAndFlush(user);
    }

    return user;
  }

  // Delete User
  @Mutation(() => Boolean)
  async delteUser(@Arg('username') username: string, @Ctx() { em }: MyContext): Promise<Boolean> {
    await em.nativeDelete(Users, { username });
    return true;
  }
}
