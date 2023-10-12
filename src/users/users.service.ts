import { Injectable } from "@nestjs/common"
import { User } from "./models/user.model"
import { InjectModel } from "@nestjs/sequelize"
import { RegisterUserDto } from "./dto/register-user.dto"
import { UserRepository } from "./models/user.repository"

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private userRepository: UserRepository,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    return await this.userRepository.newUser(registerUserDto)
  }
}
