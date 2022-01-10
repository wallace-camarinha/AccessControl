import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories';

/**
 * If the user has any of the permissions in the permissionsRoute, then the user is allowed to
access the route.
 * @param {arraytype} permissionsRoute - The route that the user is trying to access.
 * @returns The next function.
 */
export function can(permissionsRoute: string[]) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { userId } = req;

    const user = await UserRepository().findOne({
      where: { id: userId },
      relations: ['permissions'],
    });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist!' });
    }

    const permissionExist = user.permissions
      .map(permission => permission.name)
      .some(permission => permissionsRoute.includes(permission));

    if (!permissionExist) {
      return res.status(403).end();
    }

    return next();
  };
}

/**
 * If the user has one of the roles in the rolesRoutes array, then the user is allowed to access the
route.
 * @param {arraytype} rolesRoutes - The array of roles that the user must have to pass the
middleware.
 * @returns A function that returns a middleware function.
 */
export function is(rolesRoutes: string[]) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { userId } = req;

    const user = await UserRepository().findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist!' });
    }

    const rolesExist = user.roles
      .map(role => role.name)
      .some(role => rolesRoutes.includes(role));

    if (!rolesExist) {
      return res.status(403).end();
    }

    return next();
  };
}
