import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

import { RecipeDocument } from '../schemas/recipe.schema'
import { CreateRecipeIngredientDto } from './create-recipe-ingredient.dto'

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Recipe title',
    example: 'Borsch'
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  title: string

  @ApiProperty({ description: 'Recipe origin', example: 'Ukraine' })
  @IsNotEmpty()
  origin: string

  @ApiProperty({ description: 'Recipe description', example: 'Tasty soup' })
  @IsNotEmpty()
  description: string

  @ApiProperty({ description: 'Recipe instructions', example: 'Cook it' })
  @IsNotEmpty()
  instructions: string

  @ApiProperty({ description: 'Recipe image', example: 'https://example.com' })
  image: string

  @ApiProperty({
    description: 'Recipe ingredients',
    type: [CreateRecipeIngredientDto],
    example: [
      {
        name: 'Beetroot',
        units: 'g',
        quantity: 100
      }
    ],
    isArray: true
  })
  @IsNotEmpty()
  ingredients: CreateRecipeIngredientDto[]
}
