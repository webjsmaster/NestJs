import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UsersService } from '../services/user/users.service'
import { UserEntity } from '../entities/user.entity'
import { CreateUserInput } from '../input/create-user.input'
import { UpdateUserInput } from '../input/update-user.input'
import { DeleteResult, UpdateResult } from 'typeorm'

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserInput)
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(updateUserInput)
  }

  @Mutation(() => UserEntity)
  async removeUser(@Args('id') id: string): Promise<DeleteResult> {
    return await this.userService.removeUser(id)
  }

  @Query(() => UserEntity)
  async getOneUser(@Args('id') id: string): Promise<UserEntity> {
    return await this.userService.getOneUser(id)
  }

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers()
  }
}
