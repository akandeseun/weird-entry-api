import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UsersModule } from "src/users/users.module"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "src/users/models/user.model"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./strategy/jwt.strategy"
// import { ConfigModule } from "@nestjs/config"
import { UserRepository } from "src/users/models/user.repository"
import { ConfigService } from "@nestjs/config"

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: 3600 },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository, ConfigService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
