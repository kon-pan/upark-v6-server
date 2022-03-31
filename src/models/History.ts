import db from '../db/db.config';

export default class History {
  static async getEarningsToday(): Promise<number> {
    try {
      const result = await db.query(`
      SELECT
        SUM(
          (
            SELECT
              COALESCE(
                SUM(inactive_cards.cost),
                0
              )
            FROM
              inactive_cards
            WHERE
              date_trunc('day', inactive_cards.starts_at) = date_trunc('day', NOW())
          ) + (
            SELECT
              COALESCE(
                SUM(active_cards.cost),
                0
              )
            FROM
              active_cards
            WHERE
              date_trunc('day', active_cards.starts_at) = date_trunc('day', NOW())
          )
        ) AS earnings;
    `);

      return result.rows[0].earnings as number;
    } catch (error) {
      throw error;
    }
  }

  static async getCardsDistributionToday(): Promise<{
    active: number;
    expired: number;
    cancelled: number;
  }> {
    try {
      const result = await db.query(`
      SELECT 
        * 
      FROM 
        (
          SELECT 
            COUNT(*) AS active 
          FROM 
            active_cards 
          WHERE 
            date_trunc('day', active_cards.starts_at) = date_trunc('day', NOW())
        ) AS active, 
        (
          SELECT 
            COUNT(*) AS expired
          FROM 
            inactive_cards
          WHERE 
            expired = true 
            AND date_trunc('day', inactive_cards.starts_at) = date_trunc('day', NOW())
        ) AS expired, 
        (
          SELECT 
            COUNT(*) AS cancelled 
          FROM 
            inactive_cards 
          WHERE 
            cancelled = true 
            AND date_trunc('day', inactive_cards.starts_at) = date_trunc('day', NOW())
        ) AS cancelled
    `);

      return {
        active: result.rows[0].active as number,
        expired: result.rows[0].expired as number,
        cancelled: result.rows[0].cancelled as number,
      };
    } catch (error) {
      throw error;
    }
  }
}
