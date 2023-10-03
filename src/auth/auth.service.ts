import { BadRequestException, Injectable } from "@nestjs/common"
import { UserRepository } from "src/users/models/user.repository"
import { SignUpDto } from "./dto/signup.dto"
import { SignInDto } from "./dto/signin.dto"
import { throwError } from "rxjs"
import { User } from "src/users/models/user.model"
import { InjectModel } from "@nestjs/sequelize"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private userRepository: UserRepository,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    return await this.userRepository.newUser(signUpDto)
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const { email, password } = signInDto

    const user = await this.userRepository.findUserByEmail(email)
    if (!user) throw new BadRequestException("Invalid Login Details")

    const verifiedUser = await this.userRepository.verifyPassword(
      user.password,
      password,
    )

    if (!verifiedUser) throw new BadRequestException("Invalid Login Details")

    return user
  }
}
