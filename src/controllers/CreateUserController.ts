import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;
    const createUserService = new CreateUserService();

    const result = await createUserService.execute({ username, password });
    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
