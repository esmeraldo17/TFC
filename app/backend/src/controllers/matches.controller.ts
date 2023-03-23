import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public get = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this.matchesService.get(inProgress as string);

    res.status(200).json(matches);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    console.log(body);
    const finish = await this.matchesService.finish(id as unknown as number);

    res.status(200).json({ message: finish });
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const updated = await this.matchesService.update(
      id as unknown as number,
      homeTeamGoals as string,
      awayTeamGoals as string,
    );

    res.status(200).json({ message: updated });
  };
}
