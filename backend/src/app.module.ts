import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { RolesModule } from './roles/roles.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { RecipesModule } from './recipes/recipes.module'
import { IngredientsModule } from './ingredients/ingredients.module'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    RolesModule,
    AuthModule,
    RecipesModule,
    IngredientsModule
  ]
})
export class AppModule {}