import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type IngredientDocument = HydratedDocument<Ingredient>

@Schema()
export class Ingredient {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 20
  })
  name: string

  @Prop({
    required: true,
    minlength: 1,
    maxlength: 20
  })
  units: string
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient)
