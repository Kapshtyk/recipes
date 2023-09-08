import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { Ingredient } from './schemas/ingredient.schema'

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientRepository: Model<Ingredient>
  ) {}

  async createIngredient(
    createIngredientDto: CreateIngredientDto
  ): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.create(
      createIngredientDto
    )
    return ingredient
  }

  async getAllIngredients(): Promise<Ingredient[]> {
    const ingredients = await this.ingredientRepository.find()
    return ingredients
  }

  async getOneIngredient(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findById(id)
    return ingredient
  }

  async updateIngredient(id: string, updateIngredientDto: UpdateIngredientDto) {
    const updatedIngredient = await this.ingredientRepository.findByIdAndUpdate(
      id,
      updateIngredientDto,
      { new: true }
    )
    return updatedIngredient
  }

  async removeIngredient(id: string) {
    await this.ingredientRepository.findByIdAndRemove(id)
    return { message: 'Ingredient was deleted' }
  }

  async findIngredientByNameAndUnits(name: string, units: string) {
    const ingredient = await this.ingredientRepository
      .findOne({
        name,
        units
      })
      .exec()
    return ingredient
  }

  async findIngredientsByQuery(query: string) {
    console.log(query)
    const ingredients = await this.ingredientRepository
      .find({
        name: {
          $regex: query,
          $options: 'i'
        }
      })
      .exec()
    return ingredients
  }
}
