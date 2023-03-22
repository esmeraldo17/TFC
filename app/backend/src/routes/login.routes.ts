import { Router } from 'express';
import LoginCrontroller from '../controllers/login.controller';
import ValidateLoginMid from '../middleware/validateLoginMid';

const loginCrontroller = new LoginCrontroller();
const loginMid = new ValidateLoginMid();

const router = Router();

router.post('/login', loginMid.validateLogin, loginCrontroller.login);

export default router;
