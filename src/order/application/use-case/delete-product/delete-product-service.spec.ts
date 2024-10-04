import { Order } from '../../../domain/entity/order.entity';
import { Product } from '../../../domain/entity/product.entity';
import { OrderRepositoryInterface } from '../../../domain/port/persistance/order.repository.interface';
import { ProductRepositoryInterface } from '../../../domain/port/persistance/product.repository.interface';
import { DeleteProductService } from './delete-product.service';

class OrderRepositoryFake {
    async save(order: Order): Promise<Order> {
      return order;
    }

    async findByItemId(id: string): Promise<Order[]> {

      const product = new Product({
        name: "string",
        price: 2,
        description: "string",
        stock: null,
        isActive: null
      })
  
      const item = {
        product: product,
        quantity: 1
      }

      return [
        new Order({
            customerName: 'John Doe',
            items: [item],
            shippingAddress: 'Shipping Address',
            invoiceAddress: 'Invoice Address',
        })
      ];
    }
  }
  
class ProductRepositoryFake {
    async save(order: Product): Promise<Product> {
        return order;
    }
} 
    
const orderRepositoryFake = new OrderRepositoryFake() as OrderRepositoryInterface;
const productRepositoryFake = new ProductRepositoryFake() as ProductRepositoryInterface;

describe("a product can't be deleted if it's part of an order", () => {
  it('should return an error', async () => {
    const deleteProductService = new DeleteProductService(productRepositoryFake, orderRepositoryFake);
    
    await expect(
      deleteProductService.execute('id'),
    ).rejects.toThrow();
  });
});
