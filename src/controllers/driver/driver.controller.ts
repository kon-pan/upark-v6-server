// NPM packages imports
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { DateTime } from 'luxon';
import bcrypt from 'bcryptjs';

// Models imports
import Driver from '../../models/Driver';
/* -------------------------------------------------------------------------- */

export const registerDriver = async (req: Request, res: Response) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let response = {
      err: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      success: false,
    };

    for (const error of errors.array()) {
      switch (error.param) {
        case 'firstName':
          response.err.firstName = error.msg;
          break;

        case 'lastName':
          response.err.lastName = error.msg;
          break;

        case 'email':
          response.err.email = error.msg;
          break;

        case 'password':
          response.err.password = error.msg;
          break;

        case 'passwordConfirm':
          response.err.passwordConfirm = error.msg;
          break;

        default:
          break;
      }
    }

    res.send(response);
    return;
  }

  // All input fields had valid values

  // Encrypt the password
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  // Handle registration time
  const nowUtcIso = DateTime.now().toUTC().toISO();

  const data: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password: string;
    registeredOn: string;
    registeredWith: string;
    accumulatedTime: number;
  } = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    displayName: `${req.body.firstName} ${req.body.lastName}`,
    email: req.body.email,
    password: passwordHash,
    registeredOn: nowUtcIso,
    registeredWith: 'local',
    accumulatedTime: 0,
  };

  // Save driver to the database
  const result = await Driver.create(data);

  if (result) {
    res.send({ success: true });
    return;
  }

  res.send({ success: false });
};
