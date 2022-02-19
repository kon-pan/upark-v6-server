import { Request, Response } from 'express';
import Vehicle from '../../models/Vehicle';

export const getVehicles = async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.driverId);
  const result = await Vehicle.get(driverId);
  res.send(result);
};
