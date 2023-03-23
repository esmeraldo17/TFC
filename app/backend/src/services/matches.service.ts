import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

export default class MatchesService {
  private model: ModelStatic<Matches> = Matches;

  public async getAll(): Promise<Matches[]> {
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return result;
  }
}
