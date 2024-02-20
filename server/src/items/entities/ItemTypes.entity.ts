import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemImages } from './ItemImages.entity';
import { Item } from './Item.entity';
import { OrderItems } from 'src/orders/entities/OrderItems.entity';

@Entity('item_types', { schema: 'public' })
export class ItemTypes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('numeric', { name: 'price', nullable: true, precision: 8, scale: 2 })
  price: number | null;

  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ItemImages, (itemImages) => itemImages.itemType)
  itemImages: ItemImages[];

  @ManyToOne(() => Item, (item) => item.itemTypes)
  @JoinColumn([{ name: 'item_id', referencedColumnName: 'id' }])
  item: Item;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.itemTypes)
  orderItems: OrderItems[];
}
