import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: 'Username' })
  username: string

  @ApiProperty({ example: 'test@email.com', description: 'Email' })
  email: string

  @ApiProperty({ example: '123456', description: 'Password' })
  password: string
}
