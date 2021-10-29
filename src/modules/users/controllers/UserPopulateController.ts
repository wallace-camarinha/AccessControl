import { Request, Response } from 'express';
import { UserPopulateService } from '../services/UserPopulateService/UserPopulateService';

export class UserPopulateController {
  async handle(req: Request, res: Response): Promise<void> {
    const amount = Number(req.query.amount);

    const userPopulateService = new UserPopulateService();

    const response = await userPopulateService.execute(amount);
  }
}
