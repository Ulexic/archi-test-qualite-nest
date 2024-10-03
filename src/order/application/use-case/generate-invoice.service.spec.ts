import { OrderItem } from "../../domain/entity/order-item.entity";
import { Order, OrderStatus } from "../../domain/entity/order.entity";
import { OrderRepositoryInterface } from "../../domain/port/persistance/order.repository.interface";
import { GenerateInvoiceService } from "./generate-invoice.service";

class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }
}

class PdfGeneratorServiceFake {
  async generatePdf(invoiceInfos: any): Promise<Buffer> {
    return Buffer.from('invoice');
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

const pdfGeneratorServiceFake = new PdfGeneratorServiceFake() as PdfGeneratorServiceFake;


describe("the invoice can\'t be generated if the order has been paid", () => {
  it('should return an error', async () => {
    const generateInvoiceService = new GenerateInvoiceService(orderRepositoryFake, pdfGeneratorServiceFake);

    const order = new Order({
      customerName: 'John Doe',
      items: [
        new OrderItem({
          productName: 'item 1',
          price: 10,
          quantity: 1,
        }),
      ],
      shippingAddress: 'Shipping Address',
      invoiceAddress: 'Invoice Address',
    });

    order.setStatus(OrderStatus.PAID);

    orderRepositoryFake.save(order);
    await expect(
      generateInvoiceService.generateInvoice('1'),
    ).rejects.toThrow();
  });
});
