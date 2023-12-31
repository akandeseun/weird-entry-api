import { Body, Controller, Post, ValidationPipe } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { SignUpDto } from "./dto/signup.dto"
import { SignInDto } from "./dto/signin.dto"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Post("signin")
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }
}
