import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';

export default class TeamService {
  private model: ModelStatic<Team> = Team;

  public async getAll(): Promise<Team[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async getById(id: number): Promise<Team | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}
