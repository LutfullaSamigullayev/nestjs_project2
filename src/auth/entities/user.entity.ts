import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: "Auth"})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: string

    @Column({nullable: true})
    otp: string

    @Column({nullable: true, type: 'bigint'})
    otpTime: number

    @Column({nullable: true, default: false})
    isVerify: boolean

    @UpdateDateColumn()
    updateAt: Date

    @CreateDateColumn()
    createAt: Date
}