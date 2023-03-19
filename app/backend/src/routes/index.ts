import { IRouter, Router } from 'express';
import teamRoutes from './team.routes';
import loginRoutes from './login.routes';

const router: IRouter = Router();
router.use(teamRoutes);
router.use(loginRoutes);

export default router;
