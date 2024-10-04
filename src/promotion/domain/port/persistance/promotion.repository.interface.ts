import { Product } from "../../entity/product.entity";

export interface ProductRepositoryInterface {
  findByActive(filterActive: boolean): Product[] | PromiseLike<Product[]>;
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
}