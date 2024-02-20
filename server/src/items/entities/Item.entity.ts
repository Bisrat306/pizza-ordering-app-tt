import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemImages } from './ItemImages.entity';
import { ItemTypes } from './ItemTypes.entity';

@Entity('item', { schema: 'public' })
export class Item {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @OneToMany(() => ItemImages, (itemImages) => itemImages.item)
  itemImages: ItemImages[];

  @OneToMany(() => ItemTypes, (itemTypes) => itemTypes.item)
  itemTypes: ItemTypes[];
}
