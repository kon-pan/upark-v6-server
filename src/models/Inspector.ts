import { IPostgresInspector } from '../interfaces/interface.db';
import db from '../db/db.config';
import { IInspector } from 'src/interfaces/interface.main';

export default class Inspector {
  static async findOne(
    col: string,
    value: string | number
  ): Promise<IPostgresInspector> {
    switch (col) {
      case 'email':
        try {
          const result = await db.query(
            'SELECT * FROM inspectors WHERE email=$1',
            [value]
          );

          if (result.rowCount === 0) {
            return {} as IPostgresInspector; // email does not exist
          }

          const row: IPostgresInspector = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      case 'id':
        try {
          const result = await db.query(
            'SELECT * FROM inspectors WHERE id=$1',
            [value]
          );

          if (result.rowCount === 0) {
            return {} as IPostgresInspector; // user id does not exist
          }

          const row: IPostgresInspector = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  }

  static async create(data: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password: string;
  }): Promise<boolean> {
    const sql = `
    INSERT INTO inspectors(
      first_name, last_name, display_name, email, password, password_changed
    ) 
    VALUES($1, $2, $3, $4, $5, $6)
    `;

    try {
      const result = await db.query(sql, [
        data.firstName,
        data.lastName,
        data.displayName,
        data.email,
        data.password,
        false,
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

  static async findAll(): Promise<IInspector[]> {
    try {
      const result = await db.query('SELECT * FROM inspectors');

      if (result.rowCount === 0) {
        return [] as IInspector[];
      }

      const rows: IPostgresInspector[] = result.rows;

      let data: IInspector[] = [];

      rows.forEach((row) => {
        data.push({
          id: row.id,
          firstName: row.first_name,
          lastName: row.last_name,
          displayName: row.display_name,
          email: row.email,
          passwordChanged: row.password_changed,
        });
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async count(type: 'all'): Promise<number> {
    switch (type) {
      case 'all':
        try {
          const result = await db.query(`
        SELECT COUNT(*) FROM inspectors
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
