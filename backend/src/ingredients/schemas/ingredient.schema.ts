import { ApiProperty } from '@nestjs/swagger'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type IngredientDocument = HydratedDocument<Ingredient>

@Schema()
export class Ingredient {
  @ApiProperty({ example: '1', description: 'Id' })
  @Prop({ unique: true })
  id: string

  @ApiProperty({ example: 'Flour', description: 'Name' })
  @Prop({
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  })
  name: string

  @ApiProperty({ example: 'g', description: 'Units' })
  @Prop({
    required: true,
    minlength: 1,
    maxlength: 5
  })
  units: string
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient)

IngredientSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})
