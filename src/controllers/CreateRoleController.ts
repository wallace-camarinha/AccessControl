import { Request, Response } from 'express';
import { CreateRoleService } from '../services/CreateRoleService';

export class CreateRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createRoleService = new CreateRoleService();

    const result = await createRoleService.execute({ name, description });

    if (result instanceof Error) {
      return res.status(400).json({ error: result.message });
    }

    return res.json(result);
  }
}
