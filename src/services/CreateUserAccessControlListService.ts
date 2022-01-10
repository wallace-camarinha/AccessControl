import { User } from 'entities/User';
import {
  PermissionRepository,
  RoleRepository,
  UserRepository,
} from '../repositories';

type UserACLRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

export class CreateUserAccessControlListService {
  async execute({
    userId,
    roles,
    permissions,
  }: UserACLRequest): Promise<User | Error> {
    const repository = UserRepository();

    const user = await repository.findOne(userId);
    if (!user) {
      return new Error('User does not exist!');
    }

    const permissionExist = await PermissionRepository().findByIds(permissions);
    const rolesExist = await RoleRepository().findByIds(roles);

    user.permissions = permissionExist;
    user.roles = rolesExist;

    await repository.save(user);

    return user;
  }
}
