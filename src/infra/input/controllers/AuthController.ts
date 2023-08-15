import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { AuthServiceInputPort } from '../../../application/input/AuthServiceInputPort';

@injectable()
export class AuthController {
  constructor(
    @inject(InjectionTokens.AUTH_SERVICE_INPUT_PORT)
    private authServiceInputPort: AuthServiceInputPort,
  ) {}

  async auth(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password, token } = request.body;
      const result = await this.authServiceInputPort.auth(
        email,
        password,
        token,
      );
      return response.json({ token: result }).status(200);
    } catch (e) {
      if (e instanceof Error) {
        return response.json({ error: e.message }).status(500);
      }
      return response.json(e).status(500);
    }
  }
}
