import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { username, email, password } = createUserDto;

    const foundedUser = await this.userModel.findOne({where: {email}})

    if(foundedUser) {
        throw new UnauthorizedException("User is exits")
    }
    const hash = 
    this.userModel.create({createUserDto})

    return { message: "Registered" };
  }
}
