import { Router } from 'express';
import ValidateToken from '../middleware/validateTokenMid';
import LoginCrontroller from '../controllers/login.controller';
import ValidateLoginMid from '../middleware/validateLoginMid';

const loginCrontroller = new LoginCrontroller();
const loginMid = new ValidateLoginMid();
const validateToken = new ValidateToken();

const router = Router();

router.post('/login', loginMid.validateLogin, loginCrontroller.login);
router.get('/login/role', validateToken.validateToken, loginCrontroller.role);

export default router;