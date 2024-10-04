import { CreateProductOrder, Product } from '../../../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../../domain/port/persistance/product.repository.interface';

export class CreateProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(createProductOrder: CreateProductOrder): Promise<Product> {
    const order = new Product(createProductOrder);

    return await this.productRepository.save(order);
  }
}
