import { ApiProperty } from '@nestjs/swagger'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types, SchemaTypes } from 'mongoose'

export type RecipeDocument = HydratedDocument<Recipe>

@Schema()
export class Recipe {
  @ApiProperty({ example: '1', description: 'Id' })
  @Prop({ unique: true })
  id: string

  @ApiProperty({ example: 'Pasta', description: 'Title' })
  @Prop({
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  })
  title: string

  @ApiProperty({ example: 'Italy', description: 'Origin' })
  @Prop({
    required: true
  })
  origin: string

  @ApiProperty({
    example: 'Pasta with tomato sauce',
    description: 'Description'
  })
  @Prop({
    required: true
  })
  description: string

  @ApiProperty({
    example: 'Cook pasta, add sauce',
    description: 'Instructions'
  })
  @Prop({
    required: true
  })
  instructions: string

  @ApiProperty({ example: 'https://www.image.com', description: 'Image' })
  image: string

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'IngredientRecipe' }])
  ingredients: Types.ObjectId[]

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  author: Types.ObjectId
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe)

RecipeSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})
