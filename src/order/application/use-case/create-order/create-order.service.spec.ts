// how to fix jest import error?
import { Order } from '../../../domain/entity/order.entity';
import { Product } from '../../../domain/entity/product.entity';
import { OrderRepositoryInterface } from '../../../domain/port/persistance/order.repository.interface';
import { ProductRepositoryInterface } from '../../../domain/port/persistance/product.repository.interface';
import { CreateOrderService } from './create-order.service';

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
  
const orderRepositoryFake = new OrderRepositoryFake() as OrderRepositoryInterface;
const productRepositoryFake = new ProductRepositoryFake() as ProductRepositoryInterface;

describe("an order can't be created if the order have more than 5 item", () => {
  it('should return an error', async () => {
    const createOrderService = new CreateOrderService(orderRepositoryFake, productRepositoryFake);

    const item = {
      productId: "product",
      quantity: 1
    }

    await expect(
      createOrderService.execute({
        customerName: 'John Doe',
        items: [item, item, item, item, item, item],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
      }),
    ).rejects.toThrow();
  });
});
