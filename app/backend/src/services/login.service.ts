import { ModelStatic } from 'sequelize';
import { compareSync } from 'bcryptjs';
import User from '../database/models/User';
import JwtGenerator from '../utils/jwtGenerate';

export default class LoginService {
  private model: ModelStatic<User> = User;

  public async login(userEmail: string, userPassword: string): Promise<string | null> {
    const result = await this.model.findOne({
      where: {
        email: userEmail,
      },
    });

    if (result === null) {
      return result;
    }

    const isPassword = compareSync(userPassword, result?.dataValues.password);
    if (!isPassword) {
      return null;
    }

    const payload = { id: result?.dataValues.id, email: userEmail };
    const token = JwtGenerator(payload);

    return token;
  }
}
