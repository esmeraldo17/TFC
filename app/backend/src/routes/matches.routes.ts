import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import ValidateToken from '../middleware/validateTokenMid';

const matchesController = new MatchesController();
const validateToken = new ValidateToken();

const router = Router();

router.get('/matches', matchesController.get);
router.patch('/matches/:id/finish', validateToken.validateToken, matchesController.finish);
router.patch('/matches/:id', validateToken.validateToken, matchesController.update);

export default router;
