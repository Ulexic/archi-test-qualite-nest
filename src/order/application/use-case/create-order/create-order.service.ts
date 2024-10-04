import { Order, OrderDetailCommand } from '../../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../../domain/port/persistance/order.repository.interface';
import { ProductRepositoryInterface } from '../../../domain/port/persistance/product.repository.interface';

export class CreateOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async execute(orderDetailCommand: OrderDetailCommand): Promise<Order> {

    const products = []

    orderDetailCommand.items.forEach(async item => { 
      const product = await this.productRepository.findById(item.productId)

      products.push({
        product: product,
        quantity: item.quantity
      })
      
    });

    const createOrderCommand = {
      items: products,
      customerName: orderDetailCommand.customerName,
      shippingAddress: orderDetailCommand.shippingAddress,
      invoiceAddress: orderDetailCommand.invoiceAddress
    }
    
    const order = new Order(createOrderCommand);

    return await this.orderRepository.save(order);
  }
}
