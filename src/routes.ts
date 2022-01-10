import { Router } from 'express';

import { CreateUserAccessControlListController } from './controllers/CreateUserAccessControlListController';
import { ensureAuth } from './middleware/ensureAuth';

import { CreatePermissionController } from './controllers/CreatePermissionController';
import { CreateRoleController } from './controllers/CreateRoleController';
import { SessionController } from './controllers/SessionsController';
import { CreateUserController } from './controllers/CreateUserController';
import { GetAllProductsController } from './controllers/GetAllProductsController';
import { CreateProductController } from './controllers/CreateProductController';
import { CreateRolePermissionController } from './controllers/CreateRolePermissionController';

import { can, is } from './middleware/permissions';

const routes = Router();

/* PRODUCTS ROUTES */
routes.post(
  '/products',
  ensureAuth,
  can(['create_products']),
  new CreateProductController().handle,
);
routes.get(
  '/products',
  ensureAuth,
  can(['list_products']),
  new GetAllProductsController().handle,
);

/* USERS ROUTES */
routes.post('/users', new CreateUserController().handle);
routes.post('/session', new SessionController().handle);
routes.post(
  '/users/acl',
  ensureAuth,
  is(['admin']),
  new CreateUserAccessControlListController().handle,
);

/* ROLES ROUTES */
routes.post(
  '/roles/',
  ensureAuth,
  is(['admin']),
  new CreateRoleController().handle,
);
routes.post(
  '/roles/:roleId/permissions',
  ensureAuth,
  is(['admin']),
  new CreateRolePermissionController().handle,
);

/* PERMISSIONS ROUTES */
routes.post(
  '/permissions',
  ensureAuth,
  is(['admin']),
  new CreatePermissionController().handle,
);

/* END */
export { routes };
