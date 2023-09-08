import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/users/schemas/users.schema'
import { UsersService } from 'src/users/users.service'

import { IngredientsController } from './ingredients.controller'
import { IngredientsService } from './ingredients.service'
import { Ingredient, IngredientSchema } from './schemas/ingredient.schema'

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService, UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema }
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
  ],

  exports: [IngredientsService]
})
export class IngredientsModule {}
