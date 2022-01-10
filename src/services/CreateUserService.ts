import { hash } from 'bcryptjs';
import { User } from '../entities/User';
import { UserRepository } from '../repositories';

type UserRequest = {
  username: string;
  password: string;
};

export class CreateUserService {
  async execute({ password, username }: UserRequest): Promise<Error | User> {
    const repository = UserRepository();

    const existUser = await repository.findOne({ username });

    if (existUser) {
      return new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = repository.create({ username, password: passwordHash });

    await repository.save(user);

    return user;
  }
}
