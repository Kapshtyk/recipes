import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto)
    console.log(user)
    return user
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll()
    return users
  }

  async removeUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    })
    await user.destroy()
    return { message: 'User deleted' }
  }

  async getOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    })
    return user
  }
}
