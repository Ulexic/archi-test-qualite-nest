import { Controller, Get, Post, Req } from '@nestjs/common';
import { OrderItem } from '../domain/entity/order-item.entity';

const WRONG_ITEM_NUMBER_ERR_MSG = "Invalid number of items, should be between 1 and 5"
const NO_CLIENT_NAME_ERR_MSG = "No client name"
const PRICE_TOO_LOW_ERR_MSG = "Order price is too low"
const NO_DELIVERY_ADR_ERR_MSG = "No delivery adress"
const NO_BILLING_ADR_ERR_MSG = "No billing adress"

const SUCCESS_MSG = "OK"

const ITEM_LOWER_BOUND = 0
const ITEM_UPPER_BOUND = 5
const ORDER_MIN_PRICE = 10

@Controller('/orders')
export default class OrderController {
  @Get()
  async getOrders() {
    return 'All orders';
  }

  @Post("/create")
  async createOrder(@Req() req) {
    const body = req.body

    if (body.orderItems.length == ITEM_LOWER_BOUND || body.orderItems.length > ITEM_UPPER_BOUND) {
      return WRONG_ITEM_NUMBER_ERR_MSG
    }

    if (!body.clientName) {
      return NO_CLIENT_NAME_ERR_MSG
    }

    if (!body.deliveryAdr) {
      return NO_DELIVERY_ADR_ERR_MSG
    }

    if (!body.billingAdr) {
      return NO_BILLING_ADR_ERR_MSG
    }

    var orderPrice = 0

    for (var item in body.orderItems) {
      orderPrice += body.orderItems[item].price
    }

    if (orderPrice < ORDER_MIN_PRICE) {
      return PRICE_TOO_LOW_ERR_MSG
    }

    return SUCCESS_MSG

  }
}
