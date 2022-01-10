import { Role } from '../entities/Role';
import { PermissionRepository, RoleRepository } from '../repositories';

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

export class CreateRolePermissionService {
  async execute({
    roleId,
    permissions,
  }: RolePermissionRequest): Promise<Role | Error> {
    const repository = RoleRepository();
    const role = await repository.findOne(roleId);
    if (!role) {
      return new Error('Role not found!');
    }

    const permissionsExist = await PermissionRepository().findByIds(
      permissions,
    );

    role.permissions = permissionsExist;

    await repository.save(role);

    return role;
  }
}
