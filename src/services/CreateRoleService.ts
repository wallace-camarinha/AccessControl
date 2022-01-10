import { Role } from '../entities/Role';
import { RoleRepository } from '../repositories';

type RoleRequest = {
  name: string;
  description: string;
};

export class CreateRoleService {
  async execute({ name, description }: RoleRequest): Promise<Role | Error> {
    const repository = RoleRepository();

    if (await repository.findOne({ name })) {
      return new Error('Role already exists!');
    }

    const role = repository.create({ name, description });
    await repository.save(role);

    return role;
  }
}
