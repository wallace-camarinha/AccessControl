import { getRepository, Repository } from 'typeorm';

import { Role } from '../entities/Role';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { Permission } from '../entities/Permission';

export const UserRepository = (): Repository<User> => getRepository(User);

export const RoleRepository = (): Repository<Role> => getRepository(Role);

export const PermissionRepository = (): Repository<Permission> =>
  getRepository(Permission);

export const ProductRepository = (): Repository<Product> =>
  getRepository(Product);
