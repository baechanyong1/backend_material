import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto';
import { Category } from '../entities/product.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = this.create({
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
      category: dto.category,
      imageUrl: dto.imageUrl,
      description: dto.description,
      status: dto.status,
    } as Product);
    await this.save(product);
    return product;
  }
  // async findCategory() {
  //   return await this.repo.find({ where: { category } });
  // }
}
