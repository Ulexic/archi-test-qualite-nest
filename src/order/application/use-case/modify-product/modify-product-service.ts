import { CreateProductOrder, Product } from '../../../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../../domain/port/persistance/product.repository.interface';


export class ModifyProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(id: string, createProductOrder: CreateProductOrder): Promise<Product> {
    
    const order = await this.productRepository.findById(id);

    if (!order) {
      throw new Error('Product not found');
    }

    order.modify(createProductOrder);

    return await this.productRepository.save(order);
  }
}
