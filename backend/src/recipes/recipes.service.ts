import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Recipe } from './schemas/recipe.schema'
import { Model } from 'mongoose'
import { Ingredient } from 'src/ingredients/schemas/ingredient.schema'
import { IngredientsService } from 'src/ingredients/ingredients.service'
import { CreateRecipeIngredientDto } from './dto/create-recipe-ingredient.dto'
import { AddIngredientsToRecipeDto } from './dto/add-ingredients-to-recipe.dto'
import { IngredientRecipesService } from './ingredients-recipe.service'
import { add } from 'lodash'

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name)
    @InjectModel(Ingredient.name)
    private recipeRepository: Model<Recipe>,
    private ingredientsService: IngredientsService,
    private ingredientRecipeService: IngredientRecipesService
  ) {}

  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    await this.clear()
    const recipe = await this.recipeRepository.create({
      title: createRecipeDto.title,
      description: createRecipeDto.description,
      origin: createRecipeDto.origin,
      instructions: createRecipeDto.instructions,
      image: createRecipeDto.image
    })
    const updatedIngredients = await this.addIngredientsToDatabase(
      createRecipeDto.ingredients
    )
    const ingredientsRecipe = await this.addIngredientsToRecipe(recipe, updatedIngredients)
    recipe.set('ingredients', ingredientsRecipe.map(ingredient => ingredient._id))
    await recipe.save()

    return recipe
  }

  findAll() {
    return `This action returns all recipes`
  }

  findOne(id: string) {
    const recipe = this.recipeRepository.findById(id).populate({
      path: 'ingredients',
      populate: [
        { path: 'ingredient', model: 'Ingredient', select: 'name units' }
      ]
    })
    .exec();

    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }
  
    return recipe
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`
  }

  // TODO: remove this method
  async clear() {
    await this.recipeRepository.deleteMany({})
  }

  private async addIngredientsToDatabase(
    ingredients: CreateRecipeIngredientDto[]
  ) {
    const updatedIngredients = []

    for (const ingredient of ingredients) {
     const existingIngredient =
        await this.ingredientsService.findIngredientByNameAndUnits(
          ingredient.name,
          ingredient.units
        )

      if (existingIngredient) {
        updatedIngredients.push({ingredient: existingIngredient, quantity: ingredient.quantity})
      } else {
        const newIngredient = await this.ingredientsService.createIngredient({
          name: ingredient.name,
          units: ingredient.units
        })
        updatedIngredients.push({ingredient: newIngredient, quantity: ingredient.quantity})
      }
    }
    return updatedIngredients
  }

  private async addIngredientsToRecipe(
    recipe: Recipe,
    ingredients: AddIngredientsToRecipeDto[]
  ) {
    const addedIngredient = []
    const ingredientRecipes = []
    for (const ingredient of ingredients) {
      if (addedIngredient.includes(ingredient.ingredient.id)) {
        continue
      }
      const ingredientRecipe = await this.ingredientRecipeService.createIngredientRecipe(ingredient, recipe)
      ingredientRecipes.push(ingredientRecipe)
      addedIngredient.push(ingredient.ingredient.id)
    }
    return ingredientRecipes
  }
}
