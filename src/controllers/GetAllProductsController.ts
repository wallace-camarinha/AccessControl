import { Request, Response } from 'express';
import { GetAllProductsService } from '../services/GetAllProductsService';

export class GetAllProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getAllProductsService = new GetAllProductsService();

    const products = await getAllProductsService.execute();

    return res.json(products);
  }
}
