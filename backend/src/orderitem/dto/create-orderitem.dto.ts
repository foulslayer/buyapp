import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
export class CreateOrderitemDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  itemId: number;
}
