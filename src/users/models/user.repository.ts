import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "./user.model"
import { RegisterUserDto } from "../dto/register-user.dto"
import * as bcrypt from "@phc/bcrypt"

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async newUser(registerUserDto: RegisterUserDto): Promise<object> {
    const hashedPassword = await this.hashPassword(registerUserDto.password)
    const newDetails = { password: hashedPassword }
    const final = Object.assign(registerUserDto, newDetails)

    try {
      await this.userModel.create({ ...final })
    } catch (error) {
      console.log(error)
    }

    // const { password, ...result } = user
    return { msg: "user created" }
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } })
    if (!user) throw new NotFoundException("User not found")
    return user
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password)
  }

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    return await bcrypt.verify(hash, password)
  }
}
