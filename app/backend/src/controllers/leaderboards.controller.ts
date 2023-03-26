import { Request, Response } from 'express';
import HomeLeaderboardService from '../services/homeLeaderboards.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new HomeLeaderboardService()) {}

  public get = async (req: Request, res: Response) => {
    const urlInfo: string = req.url;
    if (urlInfo === '/leaderboard') {
      return res.status(200).json(await this.leaderboardService.getAll());
    }

    if (urlInfo === '/leaderboard/home') {
      return res.status(200).json(await this.leaderboardService.getHome());
    }

    const result = await this.leaderboardService.getAway();
    console.log(result);

    res.status(200).json(result);
  };
}
