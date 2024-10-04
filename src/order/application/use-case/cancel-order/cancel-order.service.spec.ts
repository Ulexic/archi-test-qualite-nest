import { Order, OrderStatus } from '../../../domain/entity/order.entity';
import { Product } from '../../../domain/entity/product.entity';
import { OrderRepositoryInterface } from '../../../domain/port/persistance/order.repository.interface';
import { CancelOrderService } from './cancel-order.service';

class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("an order can\'t be canceled if it has already been shipped", () => {
  it('should return an error', async () => {
    const cancelOrderService = new CancelOrderService(orderRepositoryFake);

    const product = new Product({
      name: "string",
      price: 18,
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
      items: [item],
      shippingAddress: 'Shipping Address',
      invoiceAddress: 'Invoice Address',
    });

    order.setStatus(OrderStatus.SHIPPED);

    orderRepositoryFake.save(order);
    await expect(
      cancelOrderService.execute('1', 'Cancel reason'),
    ).rejects.toThrow();
  });
});