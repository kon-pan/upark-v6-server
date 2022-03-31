// NPM packages imports
import { Request, Response } from 'express';

// Models imports
import Inspector from '../../models/Inspector';

export const getInspectorsCount = async (req: Request, res: Response) => {
  const inspectorsCount = await Inspector.count('all');

  res.send({ inspectorsCount });
};
