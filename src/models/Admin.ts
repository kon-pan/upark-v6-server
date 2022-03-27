import { IPostgresAdmin } from 'src/interfaces/interface.db';
import db from '../db/db.config';

export default class Admin {
  static async findOne(
    col: string,
    value: string | number
  ): Promise<IPostgresAdmin> {
    switch (col) {
      case 'email':
        try {
          const result = await db.query('SELECT * FROM admins WHERE email=$1', [
            value,
          ]);

          if (result.rowCount === 0) {
            return {} as IPostgresAdmin; // email does not exist
          }

          const row: IPostgresAdmin = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      case 'id':
        try {
          const result = await db.query('SELECT * FROM admins WHERE id=$1', [
            value,
          ]);

          if (result.rowCount === 0) {
            return {} as IPostgresAdmin; // admin id not exist
          }

          const row: IPostgresAdmin = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  }
}
