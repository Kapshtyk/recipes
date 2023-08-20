import { Module } from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Recipe, RecipeSchema } from './schemas/recipe.schema'
import { IngredientsModule } from '../ingredients/ingredients.module'
import {
  Ingredient,
  IngredientSchema
} from '../ingredients/schemas/ingredient.schema'
import {
  IngredientRecipe,
  IngredientRecipeSchema
} from './schemas/ingredient-recipe.schema'
import { IngredientRecipesService } from './ingredients-recipe.service'

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, IngredientRecipesService],
  imports: [
    IngredientsModule,
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema }
    ]),
    MongooseModule.forFeature([
      { name: IngredientRecipe.name, schema: IngredientRecipeSchema }
    ])
  ]
})
export class RecipesModule {}
