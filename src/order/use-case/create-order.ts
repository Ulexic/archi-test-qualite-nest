import { OrderItem } from "../domain/entity/order-item.entity"
import { ORDER_MIN_PRICE, ITEM_LOWER_BOUND, ITEM_UPPER_BOUND } from "../domain/entity/order.entity"

const WRONG_ITEM_NUMBER_ERR_MSG = "Invalid number of items, should be between 1 and 5"
const NO_CLIENT_NAME_ERR_MSG = "No client name"
const PRICE_TOO_LOW_ERR_MSG = "Order price is too low"
const NO_DELIVERY_ADR_ERR_MSG = "No delivery adress"
const NO_BILLING_ADR_ERR_MSG = "No billing adress"

const CREATE_ORDER_SUCCESS_MSG = "OK"

function calculateOrderPrice(orderItems) {
    var orderPrice = 0

    for (var item in orderItems) {
        orderPrice += orderItems[item].price
    }

    if (orderPrice < ORDER_MIN_PRICE) {
        return PRICE_TOO_LOW_ERR_MSG
    }
}


export function createOrder(orderItems: OrderItem[], clientName: string, deliveryAdr: string, billingAdr: string): string {
    if (orderItems.length == ITEM_LOWER_BOUND || orderItems.length > ITEM_UPPER_BOUND) {
        return WRONG_ITEM_NUMBER_ERR_MSG
    }

    if (!clientName) {
        return NO_CLIENT_NAME_ERR_MSG
    }

    if (!deliveryAdr) {
        return NO_DELIVERY_ADR_ERR_MSG
    }

    if (!billingAdr) {
        return NO_BILLING_ADR_ERR_MSG
    }

    calculateOrderPrice(orderItems)

    return CREATE_ORDER_SUCCESS_MSG
}