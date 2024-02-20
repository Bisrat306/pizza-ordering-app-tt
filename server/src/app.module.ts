import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';
import { SocketGateway } from './socket/socket.gateway';
import * as ormconfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), OrdersModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
