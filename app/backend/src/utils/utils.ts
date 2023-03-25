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

export default class Sort {
  private static sortByGoalsOwn(a: leaderboardResult, b:leaderboardResult) {
    return a.goalsOwn - b.goalsOwn;
  }

  private static sortByGoalsFavor(a: leaderboardResult, b:leaderboardResult) {
    const byGoals = b.goalsFavor - a.goalsFavor;
    if (byGoals === 0) {
      return Sort.sortByGoalsOwn(a, b);
    }
    return byGoals;
  }

  private static sortByGoalsBalance(a: leaderboardResult, b:leaderboardResult) {
    const byGoalsBalance = b.goalsBalance - a.goalsBalance;
    if (byGoalsBalance === 0) {
      return Sort.sortByGoalsFavor(a, b);
    }
    return byGoalsBalance;
  }

  private static sortByVictories(a: leaderboardResult, b:leaderboardResult) {
    const byVictories = b.totalVictories - a.totalVictories;
    if (byVictories === 0) {
      return Sort.sortByGoalsBalance(a, b);
    }
    return byVictories;
  }

  public sortByPoints = (a: leaderboardResult, b:leaderboardResult) => {
    const byPoint = b.totalPoints - a.totalPoints;
    if (byPoint === 0) {
      return Sort.sortByVictories(a, b);
    }
    return byPoint;
  };
}
