import { Order } from '../../../domain/entity/order.entity';
import { Product } from '../../../domain/entity/product.entity';
import { OrderRepositoryInterface } from '../../../domain/port/persistance/order.repository.interface';
import { PayOrderService } from './pay-order.service';

class OrderRepositoryFake {
  async findById(orderId: string): Promise<Order> {

    const product = new Product({
      name: "string",
      price: 200,
      description: "string",
      stock: null,
      isActive: null
    })

    const item = {
      product: product,
      quantity: 1
    }
    
    const order = new Order({
      customerName: 'John Doe',
      items: [item, item, item, item, item, item],
      shippingAddress: 'Shipping Address',
      invoiceAddress: 'Invoice Address',
    });

    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("an order can't be paid if the max amount is hit", () => {
  it('should return an error', async () => {
    const payOrderService = new PayOrderService(orderRepositoryFake);

    await expect(payOrderService.execute('1')).rejects.toThrow();
  });
});
