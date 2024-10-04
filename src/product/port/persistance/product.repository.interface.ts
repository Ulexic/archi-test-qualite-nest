import { Product } from 'src/product/domain/entity/product.entity';

export interface ProductRepositoryInterface {
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
}