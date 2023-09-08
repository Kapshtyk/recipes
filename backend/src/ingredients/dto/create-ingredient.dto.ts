import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateIngredientDto {
  @ApiProperty({ description: 'Ingredient name' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string

  @ApiProperty({ description: 'Ingredient units' })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  units: string
}
