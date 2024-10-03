import { OrderItem } from '../../domain/entity/order-item.entity';
import { Order, OrderStatus } from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { CancelOrderService } from '../use-case/cancel-order.service';

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

    const order = new Order({
      customerName: 'John Doe',
      items: [
        new OrderItem({
          productName: 'item 1',
          price: 10,
          quantity: 1,
        }),
      ],
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