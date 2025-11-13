import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ItemModule } from './item/item.module';
import { OrderitemModule } from './orderitem/orderitem.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/entities/order.entity';
import { Item } from './item/entities/item.entity';
import { Orderitem } from './orderitem/entities/orderitem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Datait2024!',
      database: 'buyapp',
      autoLoadEntities: true,
      entities: [Order, Item, Orderitem],
      synchronize: true,
    }),
    OrderModule,
    ItemModule,
    OrderitemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
