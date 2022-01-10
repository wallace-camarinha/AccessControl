import { Request, Response } from 'express';
import { CreateRolePermissionService } from '../services/CreateRolePermissionService';

export class CreateRolePermissionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { roleId } = req.params;
    const { permissions } = req.body;
    const createRolePermissionService = new CreateRolePermissionService();

    const result = await createRolePermissionService.execute({
      roleId,
      permissions,
    });

    if (result instanceof Error) {
      return res.status(400).json({ error: result.message });
    }

    return res.json(result);
  }
}
