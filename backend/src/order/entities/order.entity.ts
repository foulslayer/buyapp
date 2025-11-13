import { Orderitem } from 'src/orderitem/entities/orderitem.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('decimal', { precision: 7, scale: 2, default: () => "'0.00'" })
  total: number;

  @OneToMany(() => Orderitem, (orderItem) => orderItem.order)
  orderItems: Orderitem[];
}
