export class CreateUserDto {
    username: string;
    email: string;
    password: string;
}

export class VerifyDto {
    email: string;
    otp: string;
}

export class LoginDto {
    email: string;
    password: string;
}