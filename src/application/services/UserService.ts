import { inject, injectable } from 'tsyringe';
import speakeasy from 'speakeasy';
import { v4 as uuid } from 'uuid';
import qrcode from 'qrcode';
import { User } from '../../domain/models/User';
import { UserServiceInputPort } from '../input/UserServiceInputPort';
import {
  OutputListUserDto,
  OutputFindOneUserDto,
} from '../input/dto/GetUserDto';
import { UserPersistenceOutputPort } from '../output/UserPersistenceOutputPort';
import { InjectionTokens } from '../../utils/types/InjectionTokens';
import { promisify } from 'util';
import { OutputCreateUserDto } from '../input/dto/CreateUserDto';

@injectable()
export class UserService implements UserServiceInputPort {
  constructor(
    @inject(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT)
    private readonly userPersistence: UserPersistenceOutputPort,
  ) {}

  async create(user: User): Promise<OutputCreateUserDto> {
    const emailExists = await this.userPersistence.findByEmail(user.email);
    if (emailExists) {
      throw new Error('E-mail já existente');
    }
    const secret: any = speakeasy.generateSecret({
      name: process.env.MFA_AUTHENTICATION_APP_NAME,
    });
    const userCreated = new User(
      uuid(),
      user.name,
      user.email,
      user.password,
      secret.base32,
    );

    await userCreated.encryptPassword();
    const userSaved = await this.userPersistence.create(userCreated);

    const toDataURL = promisify(qrcode.toDataURL);
    const qrCode = await toDataURL(secret.otpauth_url);

    if (!qrCode) {
      throw new Error('Erro ao gerar qrCode');
    }
    return {
      user: userSaved,
      qrCode: qrCode,
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
      throw new Error('Usuário nào encontrado');
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
