import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

export default class LeaderboardFunctions {
  public getName = (homeTeamId: number, result: Team[]) => {
    const teamName = result.filter((e) => e.id === homeTeamId);
    return teamName;
  };

  public Points = (matches: Matches[]) => {
    let homeTeamPoints = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        homeTeamPoints += 3;
      }

      if (match.homeTeamGoals === match.awayTeamGoals) {
        homeTeamPoints += 1;
      }
    });
    return homeTeamPoints;
  };

  public victories = (matches: Matches[]) => {
    let homeTeamVictories = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        homeTeamVictories += 1;
      }
    });
    return homeTeamVictories;
  };

  public draws = (matches: Matches[]) => {
    let homeTeamDrwas = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        homeTeamDrwas += 1;
      }
    });
    return homeTeamDrwas;
  };

  public loses = (matches: Matches[]) => {
    let homeTeamLoses = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        homeTeamLoses += 1;
      }
    });
    return homeTeamLoses;
  };

  public favorGoals = (matches: Matches[]) => {
    let homeTeamFG = 0;
    matches.forEach((match) => {
      homeTeamFG += match.homeTeamGoals;
    });
    return homeTeamFG;
  };

  public ownGoals = (matches: Matches[]) => {
    let homeTeamOG = 0;
    matches.forEach((match) => {
      homeTeamOG += match.awayTeamGoals;
    });
    return homeTeamOG;
  };

  public goalsBalance = (matches: Matches[]) => {
    const balance = this.favorGoals(matches) - this.ownGoals(matches);
    return balance;
  };

  public efficiency = (matches: Matches[]) => {
    const effi = ((this.Points(matches) / (matches.length * 3)) * 100).toFixed(2);
    return effi;
  };
}
