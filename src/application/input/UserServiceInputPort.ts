import { User } from '../../domain/models/User';
import { OutputCreateUserDto } from './dto/CreateUserDto';
import { OutputListUserDto, OutputFindOneUserDto } from './dto/GetUserDto';

export interface UserServiceInputPort {
  create(user: User): Promise<OutputCreateUserDto>;
  findAll(): Promise<OutputListUserDto>;
  findOne(id: string): Promise<OutputFindOneUserDto>;
}
