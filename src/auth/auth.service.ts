import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "samigullayevlutfulla@gmail.com",
      pass: process.env.APP_PASSWORD as string
    }
  })
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { username, email, password } = createUserDto;

    const foundedUser = await this.userModel.findOne({where: {email}})

    if(foundedUser) {
        throw new UnauthorizedException("User is exits")
    }

    const hash = await bcrypt.hash(password, 10);
    const randomNumber = Array.from({length: 6}, () => Math.floor(Math.random() * 10)).join('')

    await this.transporter.sendMail({
      from: "samigullayevlutfulla@gmail.com",
      to: email,
      subject: 'Nestjs project',
      text: `${randomNumber}`
    })
    
    const time = Date.now()

    await this.userModel.create({username, email, password: hash, otp: randomNumber, otpTime: (time + 120000)})

    return { message: "Registered" };
  }
}
