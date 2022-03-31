// Interfaces imports
import { IPostgresDriver } from 'src/interfaces/interface.db';
import { IDriver } from 'src/interfaces/interface.main';

import db from '../db/db.config';
/* -------------------------------------------------------------------------- */

export default class Driver {
  static async findOne(
    col: string,
    value: string | number
  ): Promise<IPostgresDriver> {
    switch (col) {
      case 'email':
        try {
          const result = await db.query(
            'SELECT * FROM drivers WHERE email=$1',
            [value]
          );

          if (result.rowCount === 0) {
            return {} as IPostgresDriver; // email does not exist
          }

          const row: IPostgresDriver = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      case 'id':
        try {
          const result = await db.query('SELECT * FROM drivers WHERE id=$1', [
            value,
          ]);

          if (result.rowCount === 0) {
            return {} as IPostgresDriver; // user id does not exist
          }

          const row: IPostgresDriver = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  }

  static async findAll(): Promise<IDriver[]> {
    try {
      const result = await db.query('SELECT * FROM drivers');

      if (result.rowCount === 0) {
        return [] as IDriver[];
      }

      const rows: IPostgresDriver[] = result.rows;

      let data: IDriver[] = [];

      rows.forEach((row) => {
        data.push({
          id: row.id,
          firstName: row.first_name,
          lastName: row.last_name,
          displayName: row.display_name,
          email: row.email,
          registeredOn: row.registered_on,
          registeredWith: row.registered_with,
          accumulatedTime: row.accumulated_time,
        });
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(data: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password: string;
    registeredOn: string;
    registeredWith: string;
    accumulatedTime: number;
  }): Promise<boolean> {
    const sql = `
    INSERT INTO drivers(
      first_name, last_name, display_name, email, password, registered_on, registered_with, accumulated_time
    ) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    try {
      const result = await db.query(sql, [
        data.firstName,
        data.lastName,
        data.displayName,
        data.email,
        data.password,
        data.registeredOn,
        data.registeredWith,
        0,
      ]);

      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePersonalInfo(
    driverId: number,
    firstName: string,
    lastName: string
  ) {
    try {
      const result = await db.query(
        `
      UPDATE 
        drivers 
      SET 
        first_name = $1, 
        last_name = $2, 
        display_name = $3 
      WHERE 
        id = $4
      `,
        [firstName, lastName, `${firstName} ${lastName}`, driverId]
      );

      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateContactInfo(driverId: number, email: string) {
    try {
      const result = await db.query(
        `
      UPDATE 
        drivers 
      SET 
        email = $1
      WHERE 
        id = $2
      `,
        [email, driverId]
      );

      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePassword(driverId: number, password: string) {
    try {
      const result = await db.query(
        `
      UPDATE 
        drivers 
      SET 
        password = $1
      WHERE 
        id = $2
      `,
        [password, driverId]
      );

      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async count(type: 'all'): Promise<number> {
    switch (type) {
      case 'all':
        try {
          const result = await db.query(`
          SELECT COUNT(*) FROM drivers
          `);

          return result.rows[0].count;
        } catch (error) {
          throw error;
        }

      default:
        break;
    }
  }
}
