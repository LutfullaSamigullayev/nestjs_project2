import { IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  img?: string;

  @IsString()
  @Length(5, 1000)
  desc?: string;
}
