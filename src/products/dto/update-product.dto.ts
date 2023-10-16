import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  price: number

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string
}
