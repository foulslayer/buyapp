import { Orderitem } from 'src/orderitem/entities/orderitem.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column()
  QRCode: string;

  @OneToMany(() => Orderitem, (orderitem) => orderitem.item)
  orderItems: Orderitem[];
}
