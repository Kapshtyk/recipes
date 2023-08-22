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
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/users/users.service'
import { User, UserSchema } from 'src/users/schemas/users.schema'

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, IngredientRecipesService, UsersService],
  imports: [
    IngredientsModule,
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema }
    ]),
    MongooseModule.forFeature([
      { name: IngredientRecipe.name, schema: IngredientRecipeSchema }
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET
        }
      },
      inject: [ConfigService]
    })
  ]
})
export class RecipesModule {}
