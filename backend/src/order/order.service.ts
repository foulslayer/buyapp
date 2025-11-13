import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private readonly ordersRepo: Repository<Order>;
  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.ordersRepo.create();
    return await this.ordersRepo.save(newOrder);
  }

  async findAll() {
    return await this.ordersRepo.find();
  }

  async findOne(id: number) {
    return await this.ordersRepo.findOneBy({ id });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    await this.ordersRepo.delete({ id });
  }
}
