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

export const getEarningsLastSevenDays = async (req: Request, res: Response) => {
  const earningsLastSevenDays = await History.getEarningsLastSevenDays();

  res.send(earningsLastSevenDays.reverse());
};

export const getEarningsLastFourWeeks = async (req: Request, res: Response) => {
  const earningsLastFourWeeks = await History.getEarningsLastFourWeeks();

  res.send(earningsLastFourWeeks.reverse());
};

export const getEarningsLastSixMonths = async (req: Request, res: Response) => {
  const earningsLastSixMonths = await History.getEarningsLastSixMonths();

  res.send(earningsLastSixMonths.reverse());
};

export const getDriversLastSevenDays = async (req: Request, res: Response) => {
  const driversLastSevenDays = await History.getDriversLastSevenDays();

  res.send(driversLastSevenDays.reverse());
};

export const getDriversLastFourWeeks = async (req: Request, res: Response) => {
  const driversLastFourWeeks = await History.getDriversLastFourWeeks();

  res.send(driversLastFourWeeks.reverse());
};
