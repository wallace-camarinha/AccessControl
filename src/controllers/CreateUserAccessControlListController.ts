import { Request, Response } from 'express';
import { CreateUserAccessControlListService } from '../services/CreateUserAccessControlListService';

export class CreateUserAccessControlListController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { permissions, roles } = req.body;
    const { userId } = req;

    const createUserACLService = new CreateUserAccessControlListService();

    const result = await createUserACLService.execute({
      userId,
      roles,
      permissions,
    });

    if (result instanceof Error) {
      res.status(400).json({ error: result.message });
    }

    return res.json(result);
  }
}
