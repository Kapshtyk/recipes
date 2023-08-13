import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface UserCreationAttrs {
  username: string
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'user', description: 'Username' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string

  @ApiProperty({ example: 'test@email.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({ example: '123456', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string
}
