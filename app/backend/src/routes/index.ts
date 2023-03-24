import { IRouter, Router } from 'express';
import teamRoutes from './team.routes';
import loginRoutes from './login.routes';
import matchesRoutes from './matches.routes';
import leaderboardRoutes from './leaderboard.routes';

const router: IRouter = Router();
router.use(teamRoutes);
router.use(loginRoutes);
router.use(matchesRoutes);
router.use(leaderboardRoutes);

export default router;
