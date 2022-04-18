// NPM package imports
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';

// Models imports
import Driver from '../../models/Driver';
import Admin from '../../models/Admin';
import Inspector from '../../models/Inspector';

// Interfaces imports
import {
  IPostgresAdmin,
  IPostgresDriver,
  IPostgresInspector,
} from 'src/interfaces/interface.db';

import { isObjectEmpty } from '../utils';
/* -------------------------------------------------------------------------- */

const LocalStrategy = passportLocal.Strategy;

const localAuth = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (username, password, done) {
    try {
      let user: IPostgresDriver & { role?: string } = await Driver.findOne(
        'email',
        username
      );

      let inspector: IPostgresInspector & { role?: string } =
        await Inspector.findOne('email', username);

      let admin: IPostgresAdmin & { role?: string } = await Admin.findOne(
        'email',
        username
      );

      console.log(inspector);

      // Check if the returned user or admin object is empty
      if (
        isObjectEmpty(user) &&
        isObjectEmpty(admin) &&
        isObjectEmpty(inspector)
      ) {
        // Email doesn't match any database entry in either users or admins table

        return done(null, false);
      } else {
        // Email matched a database entry

        if (!isObjectEmpty(user)) {
          // Email matches a driver
          // Compare provided password with stored password
          const match = await bcrypt.compare(password, user.password); // true/false

          if (!match) {
            return done(null, false);
          }

          // Add user role before serialization
          user['role'] = 'driver';
          return done(null, user);
        }

        if (!isObjectEmpty(admin)) {
          // Email matches an admin
          // Compare provided password with stored password

          if (admin.password_changed) {
            // if admin has changed the initial password then the password value
            // is a hash. Use bcrypt

            const match = await bcrypt.compare(password, admin.password); // true/false

            if (!match) {
              return done(null, false);
            }
          } else {
            // if admin has not changed the initial password then the password value
            // is simple text. Compare strings
            const match = password === admin.password; // true/false

            if (!match) {
              return done(null, false);
            }
          }

          // Add user role before serialization
          admin['role'] = 'admin';
          return done(null, admin);
        }

        if (!isObjectEmpty(inspector)) {
          // Email matches an inspector
          // Compare provided password with stored password
          const match = await bcrypt.compare(password, inspector.password); // true/false

          if (!match) {
            return done(null, false);
          }

          // Add user role before serialization
          inspector['role'] = 'inspector';
          return done(null, inspector);
        }
      }
    } catch (error) {
      return done(error);
    }
  }
);

export default localAuth;
