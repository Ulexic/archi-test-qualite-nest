import { Order } from '../../../domain/entity/order.entity';
import { Product } from '../../../domain/entity/product.entity';
import { OrderRepositoryInterface } from '../../../domain/port/persistance/order.repository.interface';
import { GenerateInvoiceService } from './generate-invoice.service';

class OrderRepositoryFake {
  async findById(orderId: string): Promise<Order> {

    const product = new Product({
      name: "string",
      price: 2,
      description: "string",
      stock: null,
      isActive: null
    })

    const item = {
      product: product,
      quantity: 1
    }

    const order = new Order({
      customerName: 'John Doe',
      items: [item, item, item],
      shippingAddress: 'Shipping Address',
      invoiceAddress: 'Invoice Address',
    });

    return order;
  }
}

class PdfGeneratorServiceFake {
  async generatePdf(text: string): Promise<Buffer> {
    return Buffer.from(text);
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

const pdfGeneratorServiceFake = new PdfGeneratorServiceFake();

describe("an invoice can't be generated if the order status is PENDING", () => {
  it('should return an error', async () => {
    const generateInvoiceService = new GenerateInvoiceService(
      orderRepositoryFake,
      pdfGeneratorServiceFake,
    );

    await expect(generateInvoiceService.generateInvoice('1')).rejects.toThrow();
  });
});
