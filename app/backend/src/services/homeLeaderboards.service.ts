import { ModelStatic } from 'sequelize';
import HomeLeaderboardFunctions from '../utils/homeLeaderboardFunctions';
import AwayLeaderboardFunctions from '../utils/awayLeaderboardFunctions';
import Matches from '../database/models/Matches';
import Team from '../database/models/Team';
import Sort from '../utils/utils';

type leaderboardResult = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
};

export default class HomeLeaderboardService {
  private matcheModel: ModelStatic<Matches> = Matches;
  private teamModel: ModelStatic<Team> = Team;
  constructor(
    private homeLeaderBoardFunctions = new HomeLeaderboardFunctions(),
    private awayLeaderBoardFunctions = new AwayLeaderboardFunctions(),
  ) {}

  public async homeLeaderboard(): Promise<leaderboardResult[]> {
    const teams = await this.teamModel.findAll();
    const matchesResult = await this.matcheModel.findAll({ where: { inProgress: false } });
    const selectedTeam = teams.map((team) => {
      const teamMatches = matchesResult.filter((e) => e.homeTeamId === team.id);
      return {
        name: team.teamName,
        totalPoints: this.homeLeaderBoardFunctions.Points(teamMatches),
        totalGames: teamMatches.length,
        totalVictories: this.homeLeaderBoardFunctions.victories(teamMatches),
        totalDraws: this.homeLeaderBoardFunctions.draws(teamMatches),
        totalLosses: this.homeLeaderBoardFunctions.loses(teamMatches),
        goalsFavor: this.homeLeaderBoardFunctions.favorGoals(teamMatches),
        goalsOwn: this.homeLeaderBoardFunctions.ownGoals(teamMatches),
        goalsBalance: this.homeLeaderBoardFunctions.goalsBalance(teamMatches),
        efficiency: this.homeLeaderBoardFunctions.efficiency(teamMatches),
      };
    });

    return selectedTeam;
  }

  public async getHome(): Promise<leaderboardResult[]> {
    const leaderboard = await this.homeLeaderboard();
    const sort = new Sort();

    const result = leaderboard.sort(sort.sortByPoints);
    return result;
  }

  public async awayLeaderboard(): Promise<leaderboardResult[]> {
    const teams = await this.teamModel.findAll();
    const matchesResult = await this.matcheModel.findAll({ where: { inProgress: false } });
    const selectedTeam = teams.map((team) => {
      const teamMatches = matchesResult.filter((e) => e.awayTeamId === team.id);
      return {
        name: team.teamName,
        totalPoints: this.awayLeaderBoardFunctions.Points(teamMatches),
        totalGames: teamMatches.length,
        totalVictories: this.awayLeaderBoardFunctions.victories(teamMatches),
        totalDraws: this.awayLeaderBoardFunctions.draws(teamMatches),
        totalLosses: this.awayLeaderBoardFunctions.loses(teamMatches),
        goalsFavor: this.awayLeaderBoardFunctions.favorGoals(teamMatches),
        goalsOwn: this.awayLeaderBoardFunctions.ownGoals(teamMatches),
        goalsBalance: this.awayLeaderBoardFunctions.goalsBalance(teamMatches),
        efficiency: this.awayLeaderBoardFunctions.efficiency(teamMatches),
      };
    });

    return selectedTeam;
  }

  public async getAway(): Promise<leaderboardResult[]> {
    const leaderboard = await this.awayLeaderboard();
    const sort = new Sort();

    const result = leaderboard.sort(sort.sortByPoints);
    return result;
  }
}
