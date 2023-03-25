import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

export default class AwayLeaderboardFunctions {
  public getName = (homeTeamId: number, result: Team[]) => {
    const teamName = result.filter((e) => e.id === homeTeamId);
    return teamName;
  };

  public Points = (matches: Matches[]) => {
    let awayTeamPoints = 0;
    matches.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        awayTeamPoints += 3;
      }

      if (match.awayTeamGoals === match.homeTeamGoals) {
        awayTeamPoints += 1;
      }
    });
    return awayTeamPoints;
  };

  public victories = (matches: Matches[]) => {
    let awayTeamVictories = 0;
    matches.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        awayTeamVictories += 1;
      }
    });
    return awayTeamVictories;
  };

  public draws = (matches: Matches[]) => {
    let awayTeamDrwas = 0;
    matches.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        awayTeamDrwas += 1;
      }
    });
    return awayTeamDrwas;
  };

  public loses = (matches: Matches[]) => {
    let awayTeamLoses = 0;
    matches.forEach((match) => {
      if (match.awayTeamGoals < match.homeTeamGoals) {
        awayTeamLoses += 1;
      }
    });
    return awayTeamLoses;
  };

  public favorGoals = (matches: Matches[]) => {
    let awayTeamFG = 0;
    matches.forEach((match) => {
      awayTeamFG += match.awayTeamGoals;
    });
    return awayTeamFG;
  };

  public ownGoals = (matches: Matches[]) => {
    let awayTeamOG = 0;
    matches.forEach((match) => {
      awayTeamOG += match.homeTeamGoals;
    });
    return awayTeamOG;
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
