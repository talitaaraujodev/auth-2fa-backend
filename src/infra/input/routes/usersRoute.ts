import { container } from 'tsyringe';
import { Request, Response, Router } from 'express';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { UserService } from '../../../application/services/UserService';
import { UserPersistence } from '../../output/persistense/UserPersistence';
import { UserController } from '../controllers/UserController';

container.register(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT, {
  useClass: UserPersistence,
});
container.register(InjectionTokens.USER_SERVICE_INPUT_PORT, {
  useClass: UserService,
});
container.register(InjectionTokens.USER_CONTROLLER, {
  useClass: UserController,
});

const usersRoutes = Router();
const userController: UserController = container.resolve('UserController');

usersRoutes.get('/users', async (request: Request, response: Response) => {
  return await userController.findAll(request, response);
});

usersRoutes.get('/users/:id', async (request: Request, response: Response) => {
  return await userController.findOne(request, response);
});

usersRoutes.post('/users', async (request: Request, response: Response) => {
  return await userController.create(request, response);
});
usersRoutes.get('/mfa', async (request: Request, response: Response) => {
  return await userController.generateMFAAuthenticationCode(request, response);
});

export { usersRoutes };
