import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Orderitem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Item, (item) => item.orderItems, { onDelete: 'CASCADE' })
  item: Item;
}
