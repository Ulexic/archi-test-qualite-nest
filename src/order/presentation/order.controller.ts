import { Controller, Get, Post, Req } from '@nestjs/common';
import { createOrder } from '../use-case/create-order';

@Controller('/orders')
export default class OrderController {
  @Get()
  async getOrders() {
    return 'All orders';
  }

  @Post("/create")
  async createOrder(@Req() req) {
    return createOrder(req.body.orderItems, req.body.clientName, req.body.deliveryAdr, req.body.billingAdr);
  }
}
