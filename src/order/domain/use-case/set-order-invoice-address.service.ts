import OrderRepository from "src/order/infrastructure/order.repository";
import { Order } from "../entity/order.entity";
import { NotFoundException } from "@nestjs/common";

export class SetOrderInvoiceAddressService {
    constructor(private readonly orderRepository: OrderRepository) {}
  
    public async setOrderInvoiceAddress(orderId: string, invoiceAddress: string): Promise<Order> {
      const order = await this.orderRepository.findById(orderId);
      
      if (!order) {
        throw new NotFoundException('Pas de commande');
      }
  
      order.setInvoiceAddress(invoiceAddress);

      return this.orderRepository.save(order);
    }
  }
  