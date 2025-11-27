import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto, LoginDto, VerifyDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "samigullayevlutfulla@gmail.com",
      pass: process.env.APP_PASSWORD as string
    }
  })
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { username, email, password } = createUserDto;

    const foundedUser = await this.userRepo.findOne({where: {email}})

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

    await this.userRepo.create({username, email, password: hash, otp: randomNumber, otpTime: (time + 120000)})

    return { message: "Registered" };
  }

  async verify(verifyDto: VerifyDto): Promise<{ message: string }> {
    const { email, otp } = verifyDto;

    const foundedUser = await this.userRepo.findOne({where: {email}})

    if(!foundedUser) {
        throw new UnauthorizedException("User not found")
    }
    
    const time = Date.now()

    if(foundedUser.otpTime < time) {
      throw new BadRequestException("Otp time expired")
    }

    if(foundedUser.otp === otp) {
      await this.userRepo.update({otp: null, otpTime: null, isVerify: true}, {where: {email}})
    } else {
      throw new BadRequestException("Wrong otp")
    }

    return { message: "Verify" };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const foundedUser = await this.userRepo.findOne({where: {email}})

    if(!foundedUser) {
        throw new UnauthorizedException("User not found")
    }

    const decode = await bcrypt.compare(password, foundedUser.password)
    if(decode && foundedUser.isVerify) {
      const payload = { sub: foundedUser.id, username: foundedUser.username };
      return {access_token: await this.jwtService.signAsync(payload)}
    }else {
      throw new BadRequestException("Invalid password")
    }
  }
}
