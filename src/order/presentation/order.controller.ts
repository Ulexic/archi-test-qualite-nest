import { Controller, Get, Post, Put, Req } from '@nestjs/common';
import { CreateOrderService } from '../domain/use-case/create-order';
import { PayOrderService } from '../domain/use-case/pay-order';

@Controller('/orders')
export default class OrderController {
  constructor(private payOrderService: PayOrderService, private createOrderService: CreateOrderService) {}

  @Get()
  async getOrders() {
    return 'All orders';
  }

  @Post("/create")
  async createOrder(@Req() req) {
    return this.createOrderService.createOrder(req.body.orderItems, req.body.clientName, req.body.deliveryAdr, req.body.billingAdr);
  }

  @Put("/pay")
  async payOrder(@Req() req) {
    return this.payOrderService.payOrder(req.body.orderId);
  }
}
