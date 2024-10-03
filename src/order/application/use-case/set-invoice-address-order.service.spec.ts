import { OrderItem } from "../../domain/entity/order-item.entity";
import { Order, OrderStatus } from "../../domain/entity/order.entity";
import { OrderRepositoryInterface } from "../../domain/port/persistance/order.repository.interface";
import { SetInvoiceAddressOrderService } from "./set-invoice-address-order.service";

class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("the invoice address can\'t be set if there is no shipping address", () => {
  it('should return an error', async () => {
    const setInvoiceAddressOrderService = new SetInvoiceAddressOrderService(orderRepositoryFake);

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
      setInvoiceAddressOrderService.execute(order.id, 'New Invoice Address')
    ).rejects.toThrow();
  });
});
