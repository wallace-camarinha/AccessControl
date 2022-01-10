import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserRepository } from '../repositories';

type UserRequest = {
  username: string;
  password: string;
};

export class SessionService {
  async execute({ username, password }: UserRequest): Promise<unknown> {
    const repository = UserRepository();

    const user = await repository.findOne({ username });
    if (!user) {
      return new Error('User does not exist!');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return new Error('Username or Password incorrect');
    }

    const token = sign({}, `${process.env.SECRET_JWT}`, {
      subject: user.id,
    });

    return { token };
  }
}
