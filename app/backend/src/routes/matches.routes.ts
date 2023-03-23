import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import ValidateToken from '../middleware/validateTokenMid';

const matchesController = new MatchesController();
const validateToken = new ValidateToken();

const router = Router();

router.get('/matches', matchesController.get);
router.get('/matches/:id/finish', validateToken.validateToken, matchesController.finish);

export default router;
