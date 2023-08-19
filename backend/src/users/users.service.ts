import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/users.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepository: Model<User>) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto)
    return user
  }

  async getOne(id: number): Promise<User> {
    const user = await this.userRepository.findById(id)
    return user
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find()
    return users
  }

  async removeUser(id: number): Promise<{ message: string }> {
    await this.userRepository.findByIdAndRemove(id)
    return { message: 'User was deleted' }
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email })
    return user
  }

  async clear() {
    await this.userRepository.deleteMany({})
  }
}
