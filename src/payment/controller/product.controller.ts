import { Controller, Body, Post, Req } from '@nestjs/common';
import { ProductService } from '../services';
import { CreateProductDto } from '../dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    return await this.productService.createProduct(createProductDto);
  }
}
