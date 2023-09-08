import { ApiProperty } from '@nestjs/swagger'

export class CreateRecipeIngredientDto {
  @ApiProperty({ description: 'Ingredient name', example: 'Beetroot' })
  name: string

  @ApiProperty({ description: 'Ingredient units', example: 'g' })
  units: string

  @ApiProperty({ description: 'Ingredient quantity', example: 100 })
  quantity: number
}
