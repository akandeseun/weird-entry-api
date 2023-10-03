import { Body, Controller, Post, ValidationPipe } from "@nestjs/common"
import { RegisterUserDto } from "./dto/register-user.dto"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post("new")
  newUser(@Body(ValidationPipe) registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto)
  }
}
