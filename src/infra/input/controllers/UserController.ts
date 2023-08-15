import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { UserServiceInputPort } from '../../../application/input/UserServiceInputPort';

@injectable()
export class UserController {
  constructor(
    @inject(InjectionTokens.USER_SERVICE_INPUT_PORT)
    private userServiceInputPort: UserServiceInputPort,
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.userServiceInputPort.create(request.body);

      return response
        .json({
          message: 'Usuário criado com sucesso',
          user: result.user,
          qrCode: result.qrCode,
        })
        .status(200);
    } catch (e) {
      if (e instanceof Error) {
        return response.json({ error: e.message }).status(500);
      }
      return response.json(e).status(500);
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.userServiceInputPort.findAll();
      return response.json(users).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const user = await this.userServiceInputPort.findOne(id);
      return response.json(user).status(200);
    } catch (e) {
      return response.json(e).status(500);
    }
  }
}
