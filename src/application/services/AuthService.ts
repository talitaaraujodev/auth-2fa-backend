import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import speakeasy from 'speakeasy';
import { UserPersistenceOutputPort } from '../output/UserPersistenceOutputPort';
import { InjectionTokens } from '../../utils/types/InjectionTokens';
import { AuthServiceInputPort } from '../input/AuthServiceInputPort';

@injectable()
export class AuthService implements AuthServiceInputPort {
  constructor(
    @inject(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT)
    private readonly userPersistence: UserPersistenceOutputPort,
  ) {}

  async auth(email: string, password: string, token: string): Promise<string> {
    const user = await this.userPersistence.findByEmail(email);
    if (user) {
      const isPasswordValid = compareSync(password, user.password);
      const verifiedToken = speakeasy.totp.verify({
        secret: user.secret,
        encoding: 'base32',
        token,
        window: 1,
      });
      if (isPasswordValid) {
        return jwt.sign(
          { sub: user.id, email: user.email, name: user.name },
          'secret',
          {
            expiresIn: '5m',
          },
        ) as string;
      }
      if (!verifiedToken) {
        throw new Error('Código inválido');
      }
    }
    throw new Error('E-mail ou senha inválidos');
  }
}
