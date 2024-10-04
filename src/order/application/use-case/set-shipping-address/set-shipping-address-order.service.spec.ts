import { Order, OrderStatus } from "../../../domain/entity/order.entity";
import { Product } from '../../../domain/entity/product.entity';
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

    order.setStatus(OrderStatus.PENDING);

    orderRepositoryFake.save(order);
    
    await expect(
      setShippingAddressOrderService.execute(order.id, 'New Invoice Address')
    ).rejects.toThrow();
  });
});
