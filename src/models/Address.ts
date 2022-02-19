import db from '../db/db.config';

// Interfaces imports
import { IPostgresAddress } from 'src/interfaces/interface.db';

export default class Address {
  static async fetchAll(): Promise<IPostgresAddress[]> {
    try {
      const result = await db.query('SELECT * FROM addresses ORDER BY id ASC');

      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }
}
