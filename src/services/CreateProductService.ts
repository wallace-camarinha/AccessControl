import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories';

type ProductRequest = {
  name: string;
  description: string;
  price: number;
};

export class CreateProductService {
  async execute({
    name,
    description,
    price,
  }: ProductRequest): Promise<Product> {
    const repository = ProductRepository();

    const product = repository.create({
      name,
      description,
      price,
    });

    await repository.save(product);

    return product;
  }
}
