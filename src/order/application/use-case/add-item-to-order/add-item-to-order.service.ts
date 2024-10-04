import { NotFoundException } from '@nestjs/common';
import { SendMailServiceInterface } from 'src/order/domain/port/mail/send-mail.service.interface';
import { ItemDetailCommand } from '../../../domain/entity/order-item.entity';
import { OrderRepositoryInterface } from '../../../domain/port/persistance/order.repository.interface';
import { ProductRepositoryInterface } from '../../../domain/port/persistance/product.repository.interface';

export class AddItemToOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly productRepository: ProductRepositoryInterface,
    private readonly sendMailService: SendMailServiceInterface,
  ) {}

  async execute(orderId: string, itemDetailCommand: ItemDetailCommand[]) {

    const order = await this.orderRepository.findById(orderId)

    if(!order) {
      throw new NotFoundException('Pas de commande');
    }

    // get a list of all products with the ids in productId
    const items = await Promise.all(itemDetailCommand.map(async (item) => {
      return {
        product: await this.productRepository.findById(item.productId),
        quantity: item.quantity
      };
    }));

    order.addItems(items);
    items.map((item) => item.product.decreaseStock(item.quantity, this.sendMailService));
  }
}
