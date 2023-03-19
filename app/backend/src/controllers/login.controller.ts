import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginCrontroller {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const erroMsg = 'All fields must be filled';

    if (!email) {
      return res.status(400).json({ message: erroMsg });
    }

    if (!password) {
      return res.status(400).json({ message: erroMsg });
    }

    const token = await this.loginService.login(email, password);
    if (token === null) {
      res.status(400).json({ message: erroMsg });
    }
    res.status(200).json({ token });
  };
}
