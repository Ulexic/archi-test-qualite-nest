import { Order } from "../entity/order.entity"
import OrderRepository from "src/order/infrastructure/order.repository"

export class PayOrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    public async payOrder(orderId: string): Promise<Order> {
        // const order = await this.orderRepository.findById(orderId)

        const order = new Order()

        if (!order) {
            throw new Error('Order not found')
        }

        order.pay()

        return order
    }
}