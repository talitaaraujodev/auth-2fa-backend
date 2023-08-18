import { container } from 'tsyringe';
import { Request, Response, Router } from 'express';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { UserService } from '../../../application/services/UserService';
import { UserPersistence } from '../../output/persistense/UserPersistence';
import { UserController } from '../controllers/UserController';
import { AuthService } from '../../../application/services/AuthService';
import { AuthController } from '../controllers/AuthController';

container.register(InjectionTokens.USER_PERSISTENCE_OUTPUT_PORT, {
  useClass: UserPersistence,
});
container.register(InjectionTokens.AUTH_SERVICE_INPUT_PORT, {
  useClass: AuthService,
});
container.register(InjectionTokens.AUTH_CONTROLLER, {
  useClass: AuthController,
});

const authRoutes = Router();
const authController: AuthController = container.resolve('UserController');

authRoutes.post('/login', async (request: Request, response: Response) => {
  return await authController.auth(request, response);
});

export { authRoutes };
