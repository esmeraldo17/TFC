import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public getAll = async (req: Request, res: Response) => {
    const inProgress = req.query;
    console.log(inProgress);
    const matches = await this.matchesService.getAll();

    res.status(200).json(matches);
  };
}