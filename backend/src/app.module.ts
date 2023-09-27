import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { AuthModule } from './auth/auth.module'
import { IngredientsModule } from './ingredients/ingredients.module'
import { RecipesModule } from './recipes/recipes.module'
import { RolesModule } from './roles/roles.module'
import { UsersModule } from './users/users.module'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../static'),
      serveRoot: '/static/'
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
