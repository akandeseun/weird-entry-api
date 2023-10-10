import { PassportStrategy } from "@nestjs/passport"
import { InjectModel } from "@nestjs/sequelize"
import { Strategy, ExtractJwt } from "passport-jwt"
import { User } from "src/users/models/user.model"
import { JwtPayload } from "../jwt-payload.interface"
import { Injectable, UnauthorizedException } from "@nestjs/common"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User) private userModel: typeof User) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload
    const user = await this.userModel.findOne({ where: { email } })

    if (!user) throw new UnauthorizedException()

    return user
  }
}
