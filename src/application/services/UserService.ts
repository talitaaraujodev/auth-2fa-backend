import { inject, injectable } from 'tsyringe';
import speakeasy from 'speakeasy';
import { v4 as uuid } from 'uuid';
import { User } from '../../domain/models/User';
import { UserServiceInputPort } from '../input/UserServiceInputPort';
import {
  OutputListUserDto,
  OutputFindOneUserDto,
} from '../input/dto/GetUserDto';
import { UserPersistenceOutputPort } from '../output/UserPersistenceOutputPort';
import { InjectionTokens } from '../../utils/types/InjectionTokens';
import { OutputCreateUserDto } from '../input/dto/CreateUserDto';
import { userSchema } from '../../utils/validators/userValidator';
import { BadRequestError } from '../../utils/errors/BadRequestError';
import { NotFoundError } from '../../utils/errors/NotFoundError';

@injectable()
export class UserService implements UserServiceInputPort {
  constructor(
    @inject(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT)
    private readonly userPersistence: UserPersistenceOutputPort,
  ) {}

  async create(user: User, code: string): Promise<OutputCreateUserDto> {
    const emailExists = await this.userPersistence.findByEmail(user.email);
    if (emailExists) {
      let errors: Array<object> = [{}];
      (errors[0] as { [key: string]: any })['email'] =
        'Usuário já existente por e-mail';

      throw new NotFoundError('NotFoundError', errors);
    }
    const { error } = userSchema.validate({
      name: user.name,
      email: user.email,
      password: user.password,
      secret: user.secret,
      token: code,
    });

    if (error) {
      let errors: any = {};
      error.details.forEach((item) => {
        errors[item.path[0]] = item.message;
      });

      throw new BadRequestError('BadRequestError', [errors]);
    }

    const verifiedToken = speakeasy.totp.verify({
      secret: user.secret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
    if (!verifiedToken) {
      throw new BadRequestError('BadRequestError', [
        { code: 'Código inválido' },
      ]);
    }
    const userCreated = new User(
      uuid(),
      user.name,
      user.email,
      user.password,
      user.secret,
    );

    await userCreated.encryptPassword();
    const userSaved = await this.userPersistence.create(userCreated);

    return {
      user: userSaved,
    };
  }
  async findAll(): Promise<OutputListUserDto> {
    const users: User[] = await this.userPersistence.findAll();

    return {
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        secret: user.secret,
      })),
    };
  }
  async findOne(id: string): Promise<OutputFindOneUserDto> {
    const user: User | null = await this.userPersistence.findById(id);
    if (!user) {
      let errors: Array<object> = [{}];
      (errors[0] as { [key: string]: any })['user'] =
        'Usuário não encontrado por id.';

      throw new NotFoundError('NotFoundError', errors);
    }
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        secret: user.secret,
      },
    };
  }
}
