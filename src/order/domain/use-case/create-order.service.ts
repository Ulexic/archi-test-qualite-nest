import { Order } from 'src/order/domain/entity/order.entity';
import OrderRepository from 'src/order/infrastructure/order.repository';

export interface ItemDetailCommand {
  productName: string;
  price: number;
}

export interface CreateOrderCommand {
  items: ItemDetailCommand[];
  customerName: string;
  shippingAddress: string;
  invoiceAddress: string;
}

export class CreateOrderService {
  constructor(private orderRepository: OrderRepository) {}

  async createOrder(createOrderCommand: CreateOrderCommand): Promise<Order> {
    const order = Order.createOrder(createOrderCommand);

    return await this.orderRepository.save(order);
    return order;
  }


}
