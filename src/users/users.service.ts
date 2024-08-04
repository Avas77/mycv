import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({
      email,
      password,
    });
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({
      id,
    });
  }

  findAll() {
    return this.repo.find();
  }

  async update(id: number, attrs: Partial<User>) {
    try {
      const user = await this.findOne(id);
      Object.assign(user, attrs);
      return this.repo.save(user);
    } catch (error) {
      console.log('User not found');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      return this.repo.remove(user);
    } catch (error) {
      console.log('User not found');
    }
  }
}
