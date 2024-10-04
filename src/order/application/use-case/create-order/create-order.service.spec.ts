import { Order } from '../../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../../domain/port/persistance/order.repository.interface';
import { CreateOrderService } from '../use-case/create-order.service';

class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("an order can't be created if the order has more than 5 item", () => {
  it('should return an error', async () => {
    const createOrderService = new CreateOrderService(orderRepositoryFake);

    await expect(
      createOrderService.execute({
        customerName: 'John Doe',
        items: [
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
        ],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
      }),
    ).rejects.toThrow();
  });
});

describe('an order can´t be created if the price is less than 5', () => {
  it('should return an error', async () => {
    const createOrderService = new CreateOrderService(orderRepositoryFake);

    await expect(
      createOrderService.execute({
        customerName: 'John Doe',
        items: [
          { productName: 'item 1', price: 1, quantity: 1 },
        ],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
      }),
    ).rejects.toThrow();
  });
});

describe('an order can´t be created if there\'s no items', () => {
  it('should return an error', async () => {
    const createOrderService = new CreateOrderService(orderRepositoryFake);

    await expect(
      createOrderService.execute({
        customerName: 'John Doe',
        items: [],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
      }),
    ).rejects.toThrow();
  });
});


