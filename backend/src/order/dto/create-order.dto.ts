import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
