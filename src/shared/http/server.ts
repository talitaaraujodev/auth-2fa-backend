import 'reflect-metadata';
import app from './App';
import { usersRoutes } from '../../infra/input/routes/usersRoute';
import { authRoutes } from '../../infra/input/routes/authRoute';

app.listen(Number(process.env.PORT) || 9090, [usersRoutes, authRoutes]);
