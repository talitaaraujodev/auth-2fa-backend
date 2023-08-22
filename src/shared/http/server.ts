import 'reflect-metadata';
import app from './App';
import { usersRoutes } from '../../infra/input/routes/usersRoute';
import { authRoutes } from '../../infra/input/routes/authRoute';

const PORT = Number(process.env.PORT) || 9090;
app.listen(PORT, [usersRoutes, authRoutes]);
