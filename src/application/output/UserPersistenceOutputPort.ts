import { User } from '../../domain/models/User';



export interface UserPersistenceOutputPort {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
