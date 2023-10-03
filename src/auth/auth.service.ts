import { Injectable } from "@nestjs/common"
import { UserRepository } from "src/users/models/user.repository"
import { SignUpDto } from "./dto/signup.dto"

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(signUpDto: SignUpDto) {
    return await this.userRepository.newUser(signUpDto)
  }
}
