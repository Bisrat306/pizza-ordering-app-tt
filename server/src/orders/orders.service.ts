import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderedItemsDto } from './dto/create-order.dto';
import { Orders } from './entities/Orders.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus, OrderStatusId } from './enum/status.enum';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Status } from './entities/Status.entity';
import { OrderItems } from './entities/OrderItems.entity';
import { ItemTypes } from 'src/items/entities/ItemTypes.entity';
import { PaginationParam } from './dto/pagination.dto';
import { StateTransitionService } from './state-transition.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderItems)
    private orderItemsRepository: Repository<OrderItems>,
    @InjectRepository(ItemTypes)
    private itemTypesRepository: Repository<ItemTypes>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  /**
   * Creates orders
   * @param createOrderDto
   */
  async create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create({
      status: { id: OrderStatusId.PENDING },
      firstname: createOrderDto.firstName,
      lastname: createOrderDto.lastName,
      email: createOrderDto.email,
      phoneno: createOrderDto.phoneNo,
    });
    await this.ordersRepository.save(order);

    await this.calculateTotal(createOrderDto.items, order);
    return {
      message: 'Order placed',
      data: await this.ordersRepository.findOne({
        where: { id: order.id },
        relations: ['orderItems.itemTypes.itemImages', 'status'],
      }),
    };
  }

  /**
   * Fetches all orders by status
   * @param statusId
   */
  async fetchAll(statusId: number) {
    return await this.ordersRepository.find({
      where: { status: { id: statusId } },
      relations: ['orderItems.itemTypes.itemImages', 'status'],
    });
  }

  /**
   * Fetches all orders by status
   * @param statusId
   */
  async fetchOrders(params: PaginationParam) {
    const page = params.page ? params.page : 1;
    const limit = params.limit ? params.limit : 10;
    const data = await this.ordersRepository.find({
      where: {
        status: {
          id: In([
            OrderStatusId.PENDING,
            OrderStatusId.IN_PREPARATION,
            OrderStatusId.READY_FOR_PICKUP,
          ]),
        },
      },
      relations: ['orderItems.itemTypes.itemImages', 'status'],
      skip: (page - 1) * limit,
      take: limit,
    });
    // return data;
    const count = await this.ordersRepository.count({
      where: {
        status: {
          id: In([
            OrderStatusId.PENDING,
            OrderStatusId.IN_PREPARATION,
            OrderStatusId.READY_FOR_PICKUP,
          ]),
        },
      },
    });
    return {
      totalCount: count,
      data,
      page,
    };
  }

  /**
   * returns an order and its detail by id
   * @param id
   */
  async findOne(id: number) {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderItems.itemTypes.itemImages', 'status'],
    });
  }

  /**
   * Checks and Updates status of an order checking state valididty
   * @param params
   */
  async updateStatus(params: UpdateOrderDto) {
    const { id, newStatus } = params;
    const order = await this.ordersRepository.findOne({
      where: { id: +id },
      relations: ['orderItems.itemTypes.itemImages', 'status'],
    });

    if (!order) return { message: 'Order doesn\'t exist', data: [] };


    const status = await this.statusRepository.findOne({
      where: { id: newStatus},
    });

    if (!status) return { message: 'Status doesn\'t exist', data: [] };

    StateTransitionService.performTransition(order, status.name);

    await this.ordersRepository.save(order);

    return {
      message: 'Order status update',
      data: await this.ordersRepository.findOne({
        where: { id: +id },
        relations: ['orderItems.itemTypes.itemImages', 'status'],
      }),
    };
  }
  /**
   * takes order details, calculates total and updats DB
   * @param params
   * @param order
   */
  async calculateTotal(params: OrderedItemsDto[], order: Orders) {
    let total = 0;
    await Promise.all(
      params.map(async (items: OrderedItemsDto) => {
        const itemType = await this.itemTypesRepository.findOne({
          where: { id: items.id },
        });
        total = total + items.quantity * itemType.price;
        const orderItem = this.orderItemsRepository.create({
          itemTypes: itemType,
          quantity: items.quantity,
          order,
        });
        await this.orderItemsRepository.save(orderItem);
      }),
    );
    order.total = total.toString();
    await this.ordersRepository.save(order);
  }
}
