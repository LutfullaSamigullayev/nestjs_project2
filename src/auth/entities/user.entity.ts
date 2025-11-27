import { Column, Entity } from "typeorm"


@Entity({name: "Auth"})
export class User {
    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    otp: string

    @Column({nullable: true, type: 'bigint'})
    otpTime: number

    @Column({nullable: true, default: false})
    isVerify: boolean
}