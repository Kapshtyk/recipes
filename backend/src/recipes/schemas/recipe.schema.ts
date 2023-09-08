import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'

export type RecipeDocument = HydratedDocument<Recipe>

@Schema()
export class Recipe {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 20
  })
  title: string

  @Prop({
    required: true
  })
  origin: string

  @Prop({
    required: true
  })
  description: string

  @Prop({
    required: true
  })
  instructions: string

  @Prop({
    required: false
  })
  image: string

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'IngredientRecipe' }])
  ingredients: Types.ObjectId[]

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  author: Types.ObjectId
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe)
