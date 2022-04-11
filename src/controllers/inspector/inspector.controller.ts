// NPM packages imports
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

// Models imports
import Inspector from '../../models/Inspector';
import { IPostgresInspector } from '../../interfaces/interface.db';
import { IInspector } from '../../interfaces/interface.main';

export const getInspectorsCount = async (req: Request, res: Response) => {
  const inspectorsCount = await Inspector.count('all');

  res.send({ inspectorsCount });
};

export const createInspector = async (req: Request, res: Response) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let response = {
      err: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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

  const data: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password: string;
  } = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    displayName: `${req.body.firstName} ${req.body.lastName}`,
    email: req.body.email,
    password: passwordHash,
  };

  // Save driver to the database
  const result = await Inspector.create(data);

  if (result) {
    res.send({ success: true });
    return;
  }

  res.send({ success: false });
};

export const getAllInspectors = async (req: Request, res: Response) => {
  const inspectors = await Inspector.findAll();
  res.send(inspectors);
};
