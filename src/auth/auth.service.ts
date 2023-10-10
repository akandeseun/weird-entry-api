import { BadRequestException, Injectable } from "@nestjs/common"
import { UserRepository } from "src/users/models/user.repository"
import { SignUpDto } from "./dto/signup.dto"
import { SignInDto } from "./dto/signin.dto"
import { User } from "src/users/models/user.model"
import { InjectModel } from "@nestjs/sequelize"
import { JwtService } from "@nestjs/jwt"
import { JwtPayload } from "./jwt-payload.interface"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    return await this.userRepository.newUser(signUpDto)
  }

  async signIn(signInDto: SignInDto): Promise<object> {
    const { email, password } = signInDto

    const user = await this.userRepository.findUserByEmail(email)
    try {
      if (!user) throw new BadRequestException("Invalid Login Details")

      const verifiedUser = await this.userRepository.verifyPassword(
        user.password,
        password,
      )

      if (!verifiedUser) throw new BadRequestException("Invalid Login Details")

      const payload: JwtPayload = { email }
      const token = this.jwtService.sign(payload)
      return { token, message: `Welcome ${user.firstName}` }
    } catch (error) {
      console.log(error)
    }
  }
}
