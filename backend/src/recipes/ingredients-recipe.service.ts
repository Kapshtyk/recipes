import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IngredientRecipe } from './schemas/ingredient-recipe.schema'
import { AddIngredientsToRecipeDto } from './dto/add-ingredients-to-recipe.dto'
import { Recipe } from './schemas/recipe.schema'

@Injectable()
export class IngredientRecipesService {
  constructor(
    @InjectModel(IngredientRecipe.name)
    private ingredientRecipeRepository: Model<IngredientRecipe>,
  ) {}

  async createIngredientRecipe(ingredient: AddIngredientsToRecipeDto, recipe: Recipe): Promise<IngredientRecipe> {
    const ingredientRecipe = await this.ingredientRecipeRepository.create({
      ingredient: ingredient.ingredient,
      quantity: ingredient.quantity,
      recipe
    })
    return ingredientRecipe
  }

}
