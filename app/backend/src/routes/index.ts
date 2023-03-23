import { IRouter, Router } from 'express';
import teamRoutes from './team.routes';
import loginRoutes from './login.routes';
import matchesRoutes from './matches.routes';

const router: IRouter = Router();
router.use(teamRoutes);
router.use(loginRoutes);
router.use(matchesRoutes);

export default router;
