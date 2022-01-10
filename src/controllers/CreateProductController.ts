import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService';

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, price } = req.body;
    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      description,
      price,
    });

    return res.json(product);
  }
}
