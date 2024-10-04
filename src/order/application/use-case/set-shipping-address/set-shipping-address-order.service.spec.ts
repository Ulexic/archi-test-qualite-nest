import { OrderItem } from "../../../domain/entity/order-item.entity";
import { Order, OrderStatus } from "../../../domain/entity/order.entity";
import { OrderRepositoryInterface } from "../../../domain/port/persistance/order.repository.interface";
import { SetShippingAddressOrderService } from "./set-shipping-address-order.service";

class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("the shipping address caN\'t be set if the order isn\'t paid", () => {
  it('should return an error', async () => {
    const setShippingAddressOrderService = new SetShippingAddressOrderService(orderRepositoryFake);

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

    order.setStatus(OrderStatus.PENDING);

    orderRepositoryFake.save(order);
    
    await expect(
      setShippingAddressOrderService.execute(order.id, 'New Invoice Address')
    ).rejects.toThrow();
  });
});
