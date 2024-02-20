import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItems } from './OrderItems.entity';
import { Status } from './Status.entity';
import { Transform } from 'class-transformer';

@Entity('orders', { schema: 'public' })
export class Orders {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('numeric', { name: 'total', nullable: true, precision: 8, scale: 2 })
  total: string | null;

  @Column('character varying', { name: 'firstname', length: 255 })
  firstname: string;

  @Column('character varying', { name: 'lastname', length: 255 })
  lastname: string;

  @Column('character varying', { name: 'phoneno', nullable: true, length: 20 })
  phoneno: string | null;

  @Column('character varying', { name: 'email', length: 255 })
  email: string;

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

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  orderItems: OrderItems[];

  @ManyToOne(() => Status, (status) => status.orders)
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  status: Status;

  /**
   * Fetches Full name of Customer
   */
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
