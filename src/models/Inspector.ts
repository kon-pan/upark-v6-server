import db from '../db/db.config';

export default class Inspector {
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
