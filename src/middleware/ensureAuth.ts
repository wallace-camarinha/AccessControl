import { NextFunction, Request, response, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(403).json({ error: 'Token is missing' });
  }

  const [, token] = authHeaders.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      `${process.env.SECRET_JWT}`,
    ) as IPayload;

    req.userId = userId;

    return next();
  } catch (err) {
    return response.status(403).end();
  }
}
