import { OrderItem } from "../../domain/entity/order-item.entity";
import { Order } from "../../domain/entity/order.entity";
import { OrderRepositoryInterface } from "../../domain/port/persistance/order.repository.interface";
import { PayOrderService } from "./pay-order.service";

class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("the order can't be paid if the price is higher than 500", () => {
  it('should return an error', async () => {
    const payOrderService = new PayOrderService(orderRepositoryFake);

    const order = new Order({
      customerName: 'John Doe',
      items: [
        new OrderItem({
          productName: 'item 1',
          price: 510,
          quantity: 1,
        }),
      ],
      shippingAddress: 'Shipping Address',
      invoiceAddress: 'Invoice Address',
    });

    orderRepositoryFake.save(order);
    
    await expect(
      payOrderService.execute(order.id)
    ).rejects.toThrow();
  });
});
