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

  public async update(id: number, homeTeamGoals: string, awayTeamGoals: string): Promise<string> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return 'Updated';
  }

  public async insert(
    homeTeamGoals: string,
    awayTeamGoals: string,
    homeTeamId: string,
    awayTeamId: string,
  ): Promise<Matches[] | null> {
    const homeTeam = await this.model.findByPk(homeTeamId);
    const awayTeam = await this.model.findByPk(awayTeamId);

    if (!homeTeam) return null;
    if (!awayTeam) return null;

    const { dataValues } = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return dataValues;
  }
}
