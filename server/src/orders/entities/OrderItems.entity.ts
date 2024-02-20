import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { ItemTypes } from './../../items/entities/ItemTypes.entity';
import { Orders } from './Orders.entity';

@Entity('order_items', { schema: 'public' })
export class OrderItems {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'quantity', nullable: true })
  quantity: number | null;

  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ItemTypes, (itemTypes) => itemTypes.orderItems)
  @JoinColumn([{ name: 'item_types_id', referencedColumnName: 'id' }])
  itemTypes: ItemTypes;

  @ManyToOne(() => Orders, (orders) => orders.orderItems)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Orders;
}
