import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOrderService } from 'src/order/application/use-case/create-order/create-order.service';
import { GenerateInvoiceService } from 'src/order/application/use-case/generate-invoice/generate-invoice.service';
import { PayOrderService } from 'src/order/application/use-case/pay-order/pay-order.service';
import { PdfGeneratorServiceInterface } from 'src/order/domain/port/pdf/pdf-generator.service.interface';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { PdfGeneratorService } from 'src/order/infrastructure/pdf/pdf-generator.service';
import OrderRepositoryTypeOrm from 'src/order/infrastructure/persistance/order.repository';
import { CancelOrderService } from './application/use-case/cancel-order/cancel-order.service';
import { CreateProductService } from './application/use-case/create-product/create-product-service';
import { DeleteProductService } from './application/use-case/delete-product/delete-product.service';
import { ListProductsService } from './application/use-case/list-products/list-product-service';
import { ModifyProductService } from './application/use-case/modify-product/modify-product-service';
import { Order } from './domain/entity/order.entity';
import { Product } from './domain/entity/product.entity';
import { OrderItem } from './domain/entity/promotion.entity';
import { ProductRepositoryInterface } from './domain/port/persistance/promotion.repository.interface';
import { SendMailService } from './infrastructure/mail/send-mai.service';
import ProductRepositoryTypeOrm from './infrastructure/persistance/product.repository';
import OrderController from './infrastructure/presentation/order.controller';
import { ProductController } from './infrastructure/presentation/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
  controllers: [OrderController, ProductController],

  providers: [
    OrderRepositoryTypeOrm,
    PdfGeneratorService,
    SendMailService,
    ProductRepositoryTypeOrm,

    {
      provide: GenerateInvoiceService,
      useFactory: (
        orderRepository: OrderRepositoryInterface,
        pdfGeneratorService: PdfGeneratorServiceInterface,
      ) => {
        return new GenerateInvoiceService(orderRepository, pdfGeneratorService);
      },
      inject: [OrderRepositoryTypeOrm, PdfGeneratorService],
    },

    {
      provide: PayOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new PayOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: CreateProductService,
      useFactory: (productyRepository: ProductRepositoryInterface) => {
        return new CreateProductService(productyRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide: DeleteProductService,
      useFactory: (
        productRepository: ProductRepositoryInterface,
        orderRepository: OrderRepositoryInterface
      ) => {
        return new DeleteProductService(productRepository, orderRepository);
      },
      inject: [ProductRepositoryTypeOrm, OrderRepositoryTypeOrm],
    },
    {
      provide: ListProductsService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new ListProductsService(productRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide: ModifyProductService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new ModifyProductService(productRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    // pour pouvoir gérer l'inversion de dépendance
    // du service CreateOrderService
    // j'utilise le système de useFactory de nest
    {
      // quand j'enregistre la classe CreateOrderService
      provide: CreateOrderService,
      // je demande à Nest Js de créer une instance de cette classe
      useFactory: (
        productRepository: ProductRepositoryInterface,
        orderRepository: OrderRepositoryInterface
      ) => {
        return new CreateOrderService(orderRepository, productRepository);
      },
      // en lui injectant une instance de OrderRepositoryTypeOrm
      // à la place de l'interface qui est utilisée dans le constructeur de CreateOrderService
      inject: [OrderRepositoryTypeOrm, ProductRepositoryTypeOrm],
    },
  ],
})
export class OrderModule {}
