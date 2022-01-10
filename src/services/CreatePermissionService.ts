import { Permission } from '../entities/Permission';
import { PermissionRepository } from '../repositories';

type PermissionRequest = {
  name: string;
  description: string;
};

export class CreatePermissionService {
  async execute({
    name,
    description,
  }: PermissionRequest): Promise<Permission | Error> {
    const repository = PermissionRepository();

    if (await repository.findOne({ name })) {
      return new Error('Permission already exists!');
    }

    const permission = repository.create({ name, description });
    await repository.save(permission);

    return permission;
  }
}
