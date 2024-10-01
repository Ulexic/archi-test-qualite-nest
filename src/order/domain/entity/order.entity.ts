import { OrderItem } from '../entity/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

export const ITEM_LOWER_BOUND = 0
export const ITEM_UPPER_BOUND = 5
export const ORDER_MIN_PRICE = 10
export const ORDER_MAX_PRICE = 500

export const ORDER_STATUS = {
  PAID: 'Paid',
  PENDING: 'Pending',
}


@Entity()
export class Order {

  @CreateDateColumn()
  @Expose({ groups: ['group_orders'] })
  createdAt: Date;

  @PrimaryGeneratedColumn()
  @Expose({ groups: ['group_orders'] })
  private id: string;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  private price: number;

  @Column()
  @Expose({ groups: ['group_orders'] })
  private customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  @Expose({ groups: ['group_orders'] })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  private shippingAddress: string | null;

  private invoiceAddress: string | null;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  private shippingAddressSetAt: Date | null;

  @Column()
  @Expose({ groups: ['group_orders'] })
  private status: string;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  private paidAt: Date | null;

  public pay() {
    console.log('paying order')
    if (this.status !== ORDER_STATUS.PENDING) {
      return 'Order is not pending'
    }

    if(this.price > ORDER_MAX_PRICE) {
      return 'Order price is too high'
    }

    this.status = ORDER_STATUS.PAID
    this.paidAt = new Date()
  }

  public getOrderItems() {
    return this.orderItems
  }
}
