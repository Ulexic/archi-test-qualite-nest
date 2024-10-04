
import { Product } from '../../../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../../domain/port/persistance/product.repository.interface';
import { ModifyProductService } from './modify-product-service';

class ProductRepositoryFake {
    async save(order: Product): Promise<Product> {
        return order;
    }

    async findById(id: string): Promise<Product> {
        return new Product({
            name: 'Product 1',
            price: 10,
            description: '',
            stock: 10,
            isActive: true,
        });
    }
} 

const productRepositoryFake = new ProductRepositoryFake() as ProductRepositoryInterface;

describe("a product can't be modified if the new description is empty", () => {
  it('should return an error', async () => {
    const modifyProductService = new ModifyProductService(productRepositoryFake);

    const createProductOrder = {
        name: 'Product 1',
        price: 10,
        description: 'description',
        stock: 10,
        isActive: true,
    };
    
    await expect(
      modifyProductService.execute('id', createProductOrder),
    ).rejects.toThrow();
  });
});
