import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Order } from 'src/order/domain/entity/order.entity';
import {
  CreateOrderCommand,
  CreateOrderService,
} from 'src/order/domain/use-case/create-order.service';
import { PayOrderService } from 'src/order/domain/use-case/pay-order.service';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderCommand: CreateOrderCommand,
  ): Promise<Order> {
    return this.createOrderService.createOrder(createOrderCommand);
  }

  @Post()
  async payOrder(@Param('id') id: string): Promise<Order> {
    return await this.payOrderService.execute(id);
  }
}
