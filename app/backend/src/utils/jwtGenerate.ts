import { config } from 'dotenv';
import { SignOptions, sign } from 'jsonwebtoken';

config();

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
};

type Data = {
  id?: number,
  email: string,
  role: string,
};

export default (data: Data) => {
  const token = sign({ data }, process.env.JWT_SECRET as string, jwtConfig);
  return token;
};
