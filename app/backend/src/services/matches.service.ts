import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

export default class MatchesService {
  private model: ModelStatic<Matches> = Matches;

  public async get(inProgres: string): Promise<Matches[]> {
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!inProgres) {
      return result;
    }

    if (inProgres === 'true') {
      return result.filter((e) => e.inProgress);
    }

    if (inProgres === 'false') {
      return result.filter((e) => !e.inProgress);
    }

    return result;
  }

  public async finish(id: number): Promise<string> {
    await this.model.update({ inProgress: false }, { where: { id } });

    return 'Finished';
  }
}
