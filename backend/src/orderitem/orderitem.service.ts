import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';
import { Orderitem } from './entities/orderitem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Item } from 'src/item/entities/item.entity';
import { promises } from 'dns';

@Injectable()
export class OrderitemService {
  @InjectRepository(Orderitem)
  private readonly ordersItemsRepo: Repository<Orderitem>;

  @InjectRepository(Order)
  private readonly ordersRepo: Repository<Order>;

  @InjectRepository(Item)
  private readonly itemsRepo: Repository<Item>;

  async create(createOrderitemDto: CreateOrderitemDto) {
    const order = await this.ordersRepo.findOneBy({
      id: createOrderitemDto.orderId,
    });
    const item = await this.itemsRepo.findOneBy({
      id: createOrderitemDto.itemId,
    });

    if (!order) {
      throw new NotFoundException('order was not found ');
    }

    if (!item) {
      throw new NotFoundException('item was not found');
    }

    const orderitem = this.ordersItemsRepo.create({
      quantity: createOrderitemDto.quantity,
      item,
      order,
    });

    return this.ordersItemsRepo.save(orderitem);
  }

  findAll() {
    return this.ordersItemsRepo.find();
  }

  findOne(id: number) {
    return this.ordersItemsRepo.findOneBy({ id });
  }

  update(id: number, updateOrderitemDto: UpdateOrderitemDto) {
    return `This action updates a #${id} orderitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderitem`;
  }
}
