import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get('/matches', matchesController.get);

export default router;
