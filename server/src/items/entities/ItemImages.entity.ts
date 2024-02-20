import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './Item.entity';
import { ItemTypes } from './ItemTypes.entity';

@Entity('item_images', { schema: 'public' })
export class ItemImages {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'url', length: 255 })
  url: string;

  @Column('character varying', {
    name: 'alt_name',
    nullable: true,
    length: 255,
  })
  altName: string | null;

  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Item, (item) => item.itemImages)
  @JoinColumn([{ name: 'item_id', referencedColumnName: 'id' }])
  item: Item;

  @ManyToOne(() => ItemTypes, (itemTypes) => itemTypes.itemImages)
  @JoinColumn([{ name: 'item_type_id', referencedColumnName: 'id' }])
  itemType: ItemTypes;
}
