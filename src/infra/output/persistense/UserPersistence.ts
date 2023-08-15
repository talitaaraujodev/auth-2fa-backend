import { UserPersistenceOutputPort } from '../../../application/output/UserPersistenceOutputPort';
import { prisma } from '../../../config/database/prisma';
import { User } from '../../../domain/models/User';

export class UserPersistence implements UserPersistenceOutputPort {
  async create(user: User): Promise<User> {
    const userSaved = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        secret: user.secret,
      },
    });
    return new User(
      userSaved.id,
      userSaved.name,
      userSaved.email,
      userSaved.password,
      userSaved.secret,
    );
  }
  async findAll(): Promise<User[]> {
    return (await prisma.user.findMany()) as User[];
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return new User(
        user.id,
        user.name,
        user.email,
        user.password,
        user.secret,
      );
    }
    return null;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return new User(
        user.id,
        user.name,
        user.email,
        user.password,
        user.secret,
      );
    }
    return null;
  }
}
