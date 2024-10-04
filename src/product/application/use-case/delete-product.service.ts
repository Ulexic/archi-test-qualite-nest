import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { ProductRepositoryInterface } from 'src/product/port/persistance/product.repository.interface';

export class DeleteProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface, private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(id: string) {
    const ordersWithProduct = await this.orderRepository.findByItemId(id);

    if (ordersWithProduct.length > 0) {
      throw new Error('Product is in use');
    }   

    await this.productRepository.deleteProduct(id);
  }
}
