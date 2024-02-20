import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { OrderRoutes } from './enum/routes.enums';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationParam } from './dto/pagination.dto';

@ApiTags(OrderRoutes.root)
@Controller(OrderRoutes.root)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Creates order
   * @param body
   */
  @Post()
  create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);
  }

  /**
   * Fetches all orders by status
   * @param id
   */
  @Get(OrderRoutes.ordersByStatus)
  findAll(@Param('id') id: string) {
    return this.ordersService.fetchAll(+id);
  }

  /**
   * Fetches all orders
   * @param id
   */
  @Get()
  all(@Query() paginationParams: PaginationParam) {
    return this.ordersService.fetchOrders(paginationParams);
  }

  /**
   * Update Status
   * @param body
   */
  @Put(OrderRoutes.updateStatus)
  put(@Body() body: UpdateOrderDto) {
    return this.ordersService.updateStatus(body);
  }

  /**
   * Fetches order
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
}
