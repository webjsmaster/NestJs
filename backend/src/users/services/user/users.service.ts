import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../../entities/user.entity'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateUserInput } from '../../input/create-user.input'
import { UpdateUserInput } from '../../input/update-user.input'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userInput: CreateUserInput): Promise<UserEntity> {
    return await this.userRepository.save({ ...userInput })
  }

  async getOneUser(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async removeUser(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ id })
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UpdateResult> {
    return await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    )
  }
}
