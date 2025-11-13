import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  @InjectRepository(Item)
  private readonly itemsRepo: Repository<Item>;

  async create(createItemDto: CreateItemDto) {
    const newitem = this.itemsRepo.create(createItemDto);

    newitem.QRCode = 'temp'; //is just a holder

    const itemsQR = await this.itemsRepo.save(newitem);

    itemsQR.QRCode = `https://localhost:3000/item/${itemsQR.id}`;

    return await this.itemsRepo.save(itemsQR);
  }

  async findAll() {
    return await this.itemsRepo.find();
  }

  async findOne(id: number) {
    return await this.itemsRepo.findOneBy({ id });
  }

  async update(id: number, updateItemDto: Partial<CreateItemDto>) {
    await this.itemsRepo.update(id, updateItemDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.itemsRepo.delete({ id });
  }
}
