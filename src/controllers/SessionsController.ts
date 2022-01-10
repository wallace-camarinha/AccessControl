import { Request, Response } from 'express';
import { SessionService } from '../services/SessionService';

export class SessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;
    const sessionService = new SessionService();
    const result = await sessionService.execute({ username, password });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
