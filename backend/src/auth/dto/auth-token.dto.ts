import { ApiProperty } from '@nestjs/swagger'

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT token' })
  token: string
  email: string
  _id: string
}
