import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
