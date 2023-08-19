import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './users.model'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.getOne(id)
  }

  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.removeUser(id)
  }
}
