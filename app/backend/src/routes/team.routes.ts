import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();

const router = Router();

router.get('/teams', teamController.getAll);
router.get('/teams/:id', teamController.getById);

export default router;
