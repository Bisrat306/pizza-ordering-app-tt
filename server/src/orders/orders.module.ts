import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/Orders.entity';
import { Status } from './entities/Status.entity';
import { OrderItems } from './entities/OrderItems.entity';
import { ItemTypes } from 'src/items/entities/ItemTypes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Status, OrderItems, ItemTypes])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
