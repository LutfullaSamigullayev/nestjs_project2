import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 50)
    password: string;
}

export class VerifyDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 6)
    otp: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 50)
    password: string;
}