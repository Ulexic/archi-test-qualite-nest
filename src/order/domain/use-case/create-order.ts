import { OrderItem } from "../entity/order-item.entity"
import { ORDER_MIN_PRICE, ITEM_LOWER_BOUND, ITEM_UPPER_BOUND } from "../entity/order.entity"

export class CreateOrderService {
    public WRONG_ITEM_NUMBER_ERR_MSG = "Invalid number of items, should be between 1 and 5"
    public NO_CLIENT_NAME_ERR_MSG = "No client name"
    public PRICE_TOO_LOW_ERR_MSG = "Order price is too low"
    public NO_DELIVERY_ADR_ERR_MSG = "No delivery adress"
    public NO_BILLING_ADR_ERR_MSG = "No billing adress"

    public CREATE_ORDER_SUCCESS_MSG = "OK"

    private calculateOrderPrice(orderItems: OrderItem[]) {
        var orderPrice = 0

        for (var item in orderItems) {
            orderPrice += orderItems[item].price
        }

        if (orderPrice < ORDER_MIN_PRICE) {
            return this.PRICE_TOO_LOW_ERR_MSG
        }
    }


    public createOrder(orderItems: OrderItem[], clientName: string, deliveryAdr: string, billingAdr: string): string {
        if (orderItems.length == ITEM_LOWER_BOUND || orderItems.length > ITEM_UPPER_BOUND) {
            return this.WRONG_ITEM_NUMBER_ERR_MSG
        }

        if (!clientName) {
            return this.NO_CLIENT_NAME_ERR_MSG
        }

        if (!deliveryAdr) {
            return this.NO_DELIVERY_ADR_ERR_MSG
        }

        if (!billingAdr) {
            return this.NO_BILLING_ADR_ERR_MSG
        }

        this.calculateOrderPrice(orderItems)

        return this.CREATE_ORDER_SUCCESS_MSG
    }
}