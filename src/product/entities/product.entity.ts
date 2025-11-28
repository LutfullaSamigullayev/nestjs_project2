import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Product" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: string;

  @Column()
  img: string;

  @Column()
  desc: string;
}
