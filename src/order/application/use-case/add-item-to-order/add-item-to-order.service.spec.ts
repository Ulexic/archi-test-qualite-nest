// how to fix jest import error?
import { SendMailServiceInterface } from 'src/order/domain/port/mail/send-mail.service.interface';
import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product.repository.interface';
import { Order } from '../../../domain/entity/order.entity';
import { Product } from '../../../domain/entity/product.entity';
import { OrderRepositoryInterface } from '../../../domain/port/persistance/order.repository.interface';
import { AddItemToOrderService } from './add-item-to-order.service';


class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }

  async findById(id: string): Promise<Order> {
    const product = new Product({
      name: "string",
      price: 2,
      description: "string",
      stock: null,
      isActive: null
    });

    const item = {
      product: product,
      quantity: 1
    }

    return new Order({
      customerName: 'John Doe',
      items: [item],
      shippingAddress: 'Shipping Address',
      invoiceAddress: 'Invoice Address',
    });
  }
}

class ProductRepositoryFake {
  async save(order: Product): Promise<Product> {
      return order;
  }

  async findById(id: string): Promise<Product> {
    return new Product({
      name: "string",
      price: 2,
      description: "string",
      stock: 5,
      isActive: null
    });
  }
} 

class SendMailServiceFake {
  async sendMail(text: string) {
    return;
  }
}
  
const orderRepositoryFake = new OrderRepositoryFake() as OrderRepositoryInterface;
const productRepositoryFake = new ProductRepositoryFake() as ProductRepositoryInterface;
const sendMailServiceFake = new SendMailServiceFake() as SendMailServiceInterface;

describe("x items can't be added to an order if the stock < x", () => {
  it('should return an error', async () => {
    const addItemToOrderService = new AddItemToOrderService(orderRepositoryFake, productRepositoryFake, sendMailServiceFake);

    await expect(
      addItemToOrderService.execute('id', [{productId: 'id', quantity: 6}]),
    ).rejects.toThrow();
  });
});
