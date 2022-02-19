import { Request, Response } from 'express';

// Models imports
import Address from '../../models/Address';

export const getAddresses = async (req: Request, res: Response) => {
  const addresses = await Address.fetchAll();
  res.send(addresses);
};
