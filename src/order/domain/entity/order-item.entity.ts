
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../entity/order.entity';
import { Product } from './product.entity';

export interface ItemDetailCommand {
  productId: string;
  quantity: number;
}

export interface ItemOrderCreate {
  product: Product,
  quantity: number,
}

@Entity('order-item')
export class OrderItem {
  static MAX_QUANTITY = 5;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  price: number;

  @ManyToOne(() => Product, (product) => product)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  constructor(itemOrderCreate: ItemOrderCreate) {
    if (!itemOrderCreate) {
      return;
    }
    if (itemOrderCreate.quantity > OrderItem.MAX_QUANTITY) {
      throw new Error(
        'Quantity of items cannot exceed ' + OrderItem.MAX_QUANTITY,
      );
    }

    this.product = itemOrderCreate.product
    this.quantity = itemOrderCreate.quantity;
  }

  public getId(): string {
    return this.id;
  }
}
