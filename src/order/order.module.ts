import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancelOrderService } from 'src/order/application/use-case/cancel-order/cancel-order.service';
import { CreateOrderService } from 'src/order/application/use-case/create-order/create-order.service';
import { GenerateInvoiceService } from 'src/order/application/use-case/generate-invoice/generate-invoice.service';
import { PayOrderService } from 'src/order/application/use-case/pay-order/pay-order.service';
import { SetInvoiceAddressOrderService } from 'src/order/application/use-case/set-invoice-address/set-invoice-address-order.service';
import { SetShippingAddressOrderService } from 'src/order/application/use-case/set-shipping-address/set-shipping-address-order.service';
import { PdfGeneratorServiceInterface } from 'src/order/domain/port/pdf/pdf-generator.service.interface';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { PdfGeneratorService } from 'src/order/infrastructure/pdf/pdf-generator.service';
import OrderRepositoryTypeOrm from 'src/order/infrastructure/persistance/order.repository';
import { OrderItem } from './domain/entity/order-item.entity';
import { Order } from './domain/entity/order.entity';
import OrderController from './infrastructure/presentation/order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],

  providers: [
    OrderRepositoryTypeOrm,
    PdfGeneratorService,

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
      provide: SetInvoiceAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetInvoiceAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetShippingAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetShippingAddressOrderService(orderRepository);
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
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      // en lui injectant une instance de OrderRepositoryTypeOrm
      // à la place de l'interface qui est utilisée dans le constructeur de CreateOrderService
      inject: [OrderRepositoryTypeOrm],
    },
  ],
})
export class OrderModule {}
