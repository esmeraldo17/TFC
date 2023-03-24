import { ModelStatic } from 'sequelize';
import LeaderboardFunctions from '../utils/leaderboardFunctions';
import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

type leaderboardResult = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
};

export default class LeaderboardService {
  private matcheModel: ModelStatic<Matches> = Matches;
  private teamModel: ModelStatic<Team> = Team;
  constructor(private leaderBoardFunctions = new LeaderboardFunctions()) {}

  public async get(): Promise<leaderboardResult[]> {
    const teams = await this.teamModel.findAll();
    const matchesResult = await this.matcheModel.findAll({ where: { inProgress: false } });
    const selectedTeam = teams.map((team) => {
      const teamMatches = matchesResult.filter((e) => e.homeTeamId === team.id);
      return {
        name: team.teamName,
        totalPoints: this.leaderBoardFunctions.Points(teamMatches),
        totalGames: teamMatches.length,
        totalVictories: this.leaderBoardFunctions.victories(teamMatches),
        totalDraws: this.leaderBoardFunctions.draws(teamMatches),
        totalLosses: this.leaderBoardFunctions.loses(teamMatches),
        goalsFavor: this.leaderBoardFunctions.favorGoals(teamMatches),
        goalsOwn: this.leaderBoardFunctions.ownGoals(teamMatches),
      };
    });

    return selectedTeam;
  }
}
