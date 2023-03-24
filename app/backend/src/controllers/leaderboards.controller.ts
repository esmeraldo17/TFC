import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboards.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public get = async (req: Request, res: Response) => {
    const urlInfo: string = req.url;
    console.log(urlInfo);
    const result = await this.leaderboardService.get();

    res.status(200).json(result);
  };
}
