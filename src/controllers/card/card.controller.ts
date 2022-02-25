// NPM packages imports
import { Request, Response } from 'express';
import { ICard } from 'src/interfaces/interface.main';
import Card from '../../models/Card';

export const insertCard = async (req: Request, res: Response) => {
  const card = req.body.card as ICard;
  const result = await Card.insert(card);
  if (result) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
};

export const selectActiveCards = async (req: Request, res: Response) => {
  const driverId = req.params.driverId;
  const result = await Card.select('active-user', parseInt(driverId));
  res.send({ activeCards: result });
};
