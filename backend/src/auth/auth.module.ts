import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/users/users.service'
import { User, UserSchema } from 'src/users/schemas/users.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '12h' }
        }
      },
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ]
})
export class AuthModule {}
