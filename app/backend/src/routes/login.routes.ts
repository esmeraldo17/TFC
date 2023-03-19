import { Router } from 'express';
import LoginCrontroller from '../controllers/login.controller';

const loginCrontroller = new LoginCrontroller();

const router = Router();

router.post('/login', loginCrontroller.login);

export default router;
