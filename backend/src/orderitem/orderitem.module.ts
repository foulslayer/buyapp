import { Module } from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { OrderitemController } from './orderitem.controller';
import { Orderitem } from './entities/orderitem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orderitem, Order, Item])],
  controllers: [OrderitemController],
  providers: [OrderitemService],
})
export class OrderitemModule {}
