import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class ValidateLoginMid {
  constructor(private loginService = new LoginService()) {}

  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const erroMsg = 'All fields must be filled';

    if (!email) {
      return res.status(400).json({ message: erroMsg });
    }

    if (!password) {
      return res.status(400).json({ message: erroMsg });
    }

    next();
  };
}
