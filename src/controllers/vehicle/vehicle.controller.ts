// NPM package imports
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

// NPM models imports
import Vehicle from '../../models/Vehicle';

export const getVehicles = async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.driverId);
  const result = await Vehicle.get(driverId);

  res.send(result);
};

export const insertVehicle = async (req: Request, res: Response) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let response = {
      err: {
        vehicleName: '',
        licensePlate: '',
      },
      success: false,
    };

    for (const error of errors.array()) {
      switch (error.param) {
        case 'vehicleName':
          response.err.vehicleName = error.msg;
          break;

        case 'licensePlate':
          response.err.licensePlate = error.msg;
          break;

        default:
          break;
      }
    }

    res.send(response);
    return;
  }

  // All input fields had valid values
  const result = await Vehicle.insertOne(
    Number.parseInt(req.params.driverId),
    req.body.vehicleName,
    req.body.licensePlate
  );

  if (result) {
    res.send({ success: true });
    return;
  }

  res.send({ success: false });
};
