import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

export default class AwayLeaderboardFunctions {
  public getName = (homeTeamId: number, result: Team[]) => {
    const teamName = result.filter((e) => e.id === homeTeamId);
    return teamName;
  };

  public Points = (matches: Matches[]) => {
    let teamPoints = 0;
    matches.forEach((match) => {
      if (
        match.awayTeamGoals > match.homeTeamGoals
        || match.homeTeamGoals > match.awayTeamGoals
      ) {
        teamPoints += 3;
      }

      if (
        match.awayTeamGoals === match.homeTeamGoals
        || match.homeTeamGoals === match.awayTeamGoals
      ) {
        teamPoints += 1;
      }
    });
    return teamPoints;
  };

  public victories = (matches: Matches[]) => {
    let teamVictories = 0;
    matches.forEach((match) => {
      if (
        match.awayTeamGoals > match.homeTeamGoals
        || match.homeTeamGoals > match.awayTeamGoals
      ) {
        teamVictories += 1;
      }
    });
    return teamVictories;
  };

  public draws = (matches: Matches[]) => {
    let teamDrwas = 0;
    matches.forEach((match) => {
      if (
        match.awayTeamGoals === match.homeTeamGoals
        || match.homeTeamGoals === match.awayTeamGoals
      ) {
        teamDrwas += 1;
      }
    });
    return teamDrwas;
  };

  public loses = (matches: Matches[]) => {
    let teamLoses = 0;
    matches.forEach((match) => {
      if (
        match.awayTeamGoals < match.homeTeamGoals
        || match.homeTeamGoals < match.awayTeamGoals
      ) {
        teamLoses += 1;
      }
    });
    return teamLoses;
  };

  public favorGoals = (matches: Matches[]) => {
    let teamFG = 0;
    matches.forEach((match) => {
      teamFG += match.awayTeamGoals;
      teamFG += match.homeTeamGoals;
    });
    return teamFG;
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
