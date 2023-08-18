import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import speakeasy from 'speakeasy';
import { UserPersistenceOutputPort } from '../output/UserPersistenceOutputPort';
import { InjectionTokens } from '../../utils/types/InjectionTokens';
import { AuthServiceInputPort } from '../input/AuthServiceInputPort';
import { authSchema } from '../../utils/validators/authValidator';
import { BadRequestError } from '../../utils/errors/BadRequestError';

@injectable()
export class AuthService implements AuthServiceInputPort {
  constructor(
    @inject(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT)
    private readonly userPersistence: UserPersistenceOutputPort,
  ) {}

  async auth(email: string, password: string, token: string): Promise<string> {
    const user = await this.userPersistence.findByEmail(email);
    if (user) {
      const verifiedToken = speakeasy.totp.verify({
        secret: user.secret,
        encoding: 'base32',
        token,
        window: 1,
      });
      if (!verifiedToken) {
        throw new BadRequestError('BadRequestError', [
          { code: 'Código inválido.' },
        ]);
      }

      const isPasswordValid = compareSync(password, user.password);
      if (isPasswordValid) {
        return jwt.sign(
          { sub: user.id, email: user.email, name: user.name },
          'secret',
          {
            expiresIn: '5m',
          },
        ) as string;
      }
    }
    throw new BadRequestError('BadRequestError', [
      { error: 'Credenciais inválidas.' },
    ]);
  }
}
