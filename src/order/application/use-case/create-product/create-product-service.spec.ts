import { Product } from '../../../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../../domain/port/persistance/product.repository.interface';
import { CreateProductService } from './create-product-service';

class ProductRepositoryFake {
  async save(product: Product): Promise<Product> {
    return product;
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as ProductRepositoryInterface;

describe("a product can't be created without a description", () => {
  it('should return an error', async () => {
    const createProductService = new CreateProductService(productRepositoryFake);

    const createProductOrder = {
        name: 'Product 1',
        price: 10,
        description: '',
        stock: 10,
        isActive: true,
    };
    
    await expect(
      createProductService.execute(createProductOrder),
    ).rejects.toThrow();
  });
});
