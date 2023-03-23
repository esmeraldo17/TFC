import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches';

export default class MatchesService {
  private model: ModelStatic<Matches> = Matches;

  public async getAll(): Promise<Matches[]> {
    const result = await this.model.findAll();
    return result;
  }
}
