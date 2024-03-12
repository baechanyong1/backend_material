import { ProductStatus } from '../entities/product.entity';

export type CreateProductDto = {
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  description: string;
  status: ProductStatus;
};
