import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "./models/user.model"
import { UserRepository } from "./models/user.repository"

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
