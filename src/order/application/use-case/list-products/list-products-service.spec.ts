import { Product } from '../../../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../../domain/port/persistance/product.repository.interface';
import { ListProductsService } from './list-product-service';

class ProductRepositoryFake {
    async save(order: Product): Promise<Product> {
        return order;
    }

    findByActive(filterActive: boolean): Product[] | PromiseLike<Product[]> {
        return [];
    }

    findAll(): Product[] | PromiseLike<Product[]> {
        return [
            new Product({
                name: 'Product 1',
                price: 10,
                description: 'description1',
                stock: 10,
                isActive: true,
            }),
            new Product({
                name: 'Product 2',
                price: 20,
                description: 'Description 2',
                stock: 20,
                isActive: false,
            }),
        ];
    }
} 

const productRepositoryFake = new ProductRepositoryFake() as ProductRepositoryInterface;

describe("if we don't filter the list", () => {
  it('should return a list of length 2', async () => {
    const listProductsService = new ListProductsService(productRepositoryFake);

    const createProductOrder = {
        name: 'Product 1',
        price: 10,
        description: 'description',
        stock: 10,
        isActive: true,
    };
    
    await expect(
      listProductsService.execute(null),
    ).resolves.toHaveLength(2);
  });
});
