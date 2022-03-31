import { Request, Response } from 'express';
import History from '../../models/History';

export const getEarningsToday = async (req: Request, res: Response) => {
  const earnings = await History.getEarningsToday();
  res.send({ earnings });
};

export const getCardsDistributionToday = async (
  req: Request,
  res: Response
) => {
  const distribution = await History.getCardsDistributionToday();
  res.send({ distribution });
};
