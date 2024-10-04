import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderService } from 'src/order/application/use-case/create-order/create-order.service';
import { PayOrderService } from 'src/order/application/use-case/pay-order/pay-order.service';
import {
  Order,
  OrderDetailCommand,
} from 'src/order/domain/entity/order.entity';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
  ) {}

  @Post()
  async createOrder(
    @Body() orderDetailCommand: OrderDetailCommand,
  ): Promise<Order> {
    return this.createOrderService.execute(orderDetailCommand);
  }

  @Post()
  async payOrder(@Param('id') id: string): Promise<Order> {
    return await this.payOrderService.execute(id);
  }
}
