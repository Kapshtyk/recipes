import { ApiProperty } from '@nestjs/swagger'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @ApiProperty({ example: '1', description: 'Id' })
  @Prop({ unique: true })
  id: string

  @ApiProperty({ example: 'user', description: 'Username' })
  @Prop({
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9_-]+$/
  })
  username: string

  @ApiProperty({ example: 'email@gmail.com', description: 'Email' })
  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email format'
    }
  })
  email: string

  @ApiProperty({ example: '123456', description: 'Password' })
  @Prop({
    required: true,
    minlength: 6
  })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})
