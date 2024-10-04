import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product.repository.interface';
import { Product } from '../../../domain/entity/product.entity';

export class ListProductsService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(filterActive: boolean | null): Promise<Product[]> {
    
    if (!filterActive !== null) {
      return await this.productRepository.findAll();
    }

    return await this.productRepository.findByActive(filterActive);
  }
}
