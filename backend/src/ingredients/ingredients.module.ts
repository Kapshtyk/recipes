import { Module } from '@nestjs/common'
import { IngredientsService } from './ingredients.service'
import { IngredientsController } from './ingredients.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Ingredient, IngredientSchema } from './schemas/ingredient.schema'

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService],
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema }
    ])
  ],
  exports: [IngredientsService]
})
export class IngredientsModule {}
