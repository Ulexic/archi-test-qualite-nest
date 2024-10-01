import { NotFoundException } from '@nestjs/common';
import { Order } from 'src/order/domain/entity/order.entity';
import OrderRepository from 'src/order/infrastructure/order.repository';

export class PayOrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    // const order = new Order();

    if (!order) {
      throw new NotFoundException('Pas de commande');
    }

    order.pay();

    // return order;
    return this.orderRepository.save(order);
  }
}
