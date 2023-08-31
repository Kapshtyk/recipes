import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IngredientsService } from 'src/ingredients/ingredients.service'
import { IngredientDocument } from 'src/ingredients/schemas/ingredient.schema'

import { AddIngredientsToRecipeDto } from './dto/add-ingredients-to-recipe.dto'
import {
  IngredientRecipe,
  IngredientRecipeDocument
} from './schemas/ingredient-recipe.schema'
import { Recipe, RecipeDocument } from './schemas/recipe.schema'

@Injectable()
export class IngredientRecipesService {
  constructor(
    @InjectModel(IngredientRecipe.name)
    private ingredientRecipeRepository: Model<IngredientRecipe>
  ) {}

  async createIngredientRecipe(
    ingredient: AddIngredientsToRecipeDto,
    recipe: Recipe
  ): Promise<IngredientRecipeDocument> {
    const ingredientRecipe = await this.ingredientRecipeRepository.create({
      ingredient: ingredient.ingredient,
      quantity: ingredient.quantity,
      recipe
    })
    return ingredientRecipe
  }

  async updateIngredientRecipe(
    ingredientRecipe: IngredientRecipeDocument,
    quantity: number
  ): Promise<IngredientRecipeDocument> {
    ingredientRecipe.set('quantity', quantity)
    await ingredientRecipe.save()
    return ingredientRecipe
  }

  async removeIngredientRecipe(ingredientRecipe: IngredientRecipeDocument) {
    await this.ingredientRecipeRepository.findByIdAndRemove(
      ingredientRecipe._id
    )
    return { message: 'IngredientRecipe was deleted' }
  }

  async getIngredientsRecipeByIngredient(
    ingredient: IngredientDocument
  ): Promise<IngredientRecipeDocument | null> {
    const ingredientRecipe = await this.ingredientRecipeRepository
      .findOne({
        ingredient
      })
      .exec()
    return ingredientRecipe
  }

  async getIngredientsRecipeByRecipe(
    recipe: RecipeDocument
  ): Promise<IngredientRecipeDocument[]> {
    const ingredientsRecipe = await this.ingredientRecipeRepository
      .find({
        recipe: recipe._id
      })
      .exec()
    return ingredientsRecipe
  }
}
