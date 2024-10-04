import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateProductService } from 'src/order/application/use-case/create-product/create-product-service';
import { DeleteProductService } from 'src/order/application/use-case/delete-product/delete-product.service';
import { CreateProductOrder } from 'src/order/domain/entity/product.entity';


@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly deleteProductService: DeleteProductService,
  ) {}

  @Post()
  create(@Body() createProductOrder: CreateProductOrder) {
    return this.createProductService.execute(createProductOrder);
  }

  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProductService.execute(id);
  }
}
