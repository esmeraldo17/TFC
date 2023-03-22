import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginCrontroller {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const erroMsg = 'Invalid email or password';

    if (!isValidEmail.test(email)) {
      return res.status(401).json({ message: erroMsg });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: erroMsg });
    }
    const token = await this.loginService.login(email, password);
    if (token === null) {
      return res.status(401).json({ message: erroMsg });
    }
    res.status(200).json({ token });
  };

  public role = async (req: Request, res: Response) => {
    const { data } = res.locals.user;
    const { role } = data;
    console.log(role);

    res.status(200).json({ role });
  };
}
