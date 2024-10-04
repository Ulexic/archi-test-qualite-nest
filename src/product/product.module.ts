import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/domain/entity/order.entity';
import OrderRepositoryTypeOrm from 'src/order/infrastructure/persistance/order.repository';
import { CreateProductService } from 'src/product/application/use-case/create-product-service';
import { DeleteProductService } from 'src/product/application/use-case/delete-product.service';
import { Product } from './domain/entity/product.entity';
import ProductRepositoryTypeOrm from './infrastructure/persistance/product.repository';
import { ProductController } from './infrastructure/presentation/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order])],
  controllers: [ProductController],

  providers: [
    ProductRepositoryTypeOrm,
    OrderRepositoryTypeOrm,

    {
      provide: CreateProductService,
      useFactory: (productRepository: ProductRepositoryTypeOrm) => {
        return new CreateProductService(productRepository);
      },
      inject: [ProductRepositoryTypeOrm],
    },

    {
      provide: DeleteProductService,
      useFactory: (
        productRepository: ProductRepositoryTypeOrm, 
        orderRepository: OrderRepositoryTypeOrm
      ) => {
        return new DeleteProductService(productRepository, orderRepository);
      },
      inject: [ProductRepositoryTypeOrm, OrderRepositoryTypeOrm],
    }
  ]
})
export class ProductModule {}
 