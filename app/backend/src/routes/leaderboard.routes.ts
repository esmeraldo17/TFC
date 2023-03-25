import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboards.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/leaderboard/home', leaderboardController.get);
router.get('/leaderboard/away', leaderboardController.get);

export default router;
