import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @ApiProperty({ example: 'test@email.com', description: 'Email' })
  email: string

  @ApiProperty({ example: '123456', description: 'Password' })
  password: string
}
