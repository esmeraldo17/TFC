import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();

const router = Router();

router.get('/teams', teamController.getAll);

export default router;
