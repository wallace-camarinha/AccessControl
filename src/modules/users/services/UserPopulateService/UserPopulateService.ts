import axios from 'axios';

export class UserPopulateService {
  async execute(amount: number): Promise<any> {
    if (amount > 1000) {
      return new Error('Amount is too big');
    }
    const users = [];

    await axios.get(
      `https://randomuser.me/api/?page=${page}results=100&seed=1`,
    );
  }
}
