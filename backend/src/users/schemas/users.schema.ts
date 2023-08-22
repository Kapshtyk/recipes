import { ApiProperty } from '@nestjs/swagger'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose'

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
    maxlength: 20
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
    required: true
  })
  password: string

  public _id?: ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})
