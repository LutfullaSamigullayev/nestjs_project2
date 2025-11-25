import { Column, Model, Table } from "sequelize-typescript";

@Table({timestamps: true})
export class User extends Model {
    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    @Column
    otp: string

    @Column
    otpTime: number

    @Column
    isVerify: boolean
}