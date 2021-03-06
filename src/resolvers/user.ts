import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from '@entities/user';
import { UserService } from '@services/user';
import UserInput from '@inputs/user';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RoleGuard)
  @Query(() => [User])
  async listUsers() {
    return await this.userService.listUsers();
  }

  @UseGuards(RoleGuard)
  @Mutation(() => User)
  async createUser(@Args('data') data: UserInput): Promise<User> {
    return await this.userService.createUser(data);
  }

  @UseGuards(RoleGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('data') data: number): Promise<boolean> {
    return await this.userService.deleteUser(data);
  }
}
