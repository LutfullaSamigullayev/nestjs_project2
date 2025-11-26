import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({timestamps: true, modelName: "Auth"})
export class User extends Model {
    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    @Column({allowNull: true})
    otp: string

    @Column({allowNull: true, type: DataType.BIGINT})
    otpTime: number

    @Column({allowNull: true, defaultValue: false})
    isVerify: boolean
}