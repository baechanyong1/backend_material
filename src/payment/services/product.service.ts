import { ProductRepository } from '../repositories';
import { CreateProductDto } from '../dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product, Category as ProductCategory } from '../entities';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepository,
    //private readonly category: Category,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const matchCategory = ProductCategory.toString();
    if (dto.category != matchCategory)
      throw new HttpException(
        //'카테고리를 확인해주세요.',
        `${matchCategory} 中 선택해주세요`,
        HttpStatus.BAD_REQUEST,
      );
    return await this.productRepo.createProduct(dto);
  }
}
