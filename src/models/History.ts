import { DateTime } from 'luxon';
import db from '../db/db.config';

export default class History {
  static async getEarningsToday(): Promise<number> {
    try {
      const result = await db.query(`
      SELECT 
        COALESCE(SUM(amount), 0) AS earnings 
      FROM 
        earnings 
      WHERE 
        date_trunc('day', earnings.datetime) = date_trunc('day', NOW())
      `);

      return result.rows[0].earnings as number;
    } catch (error) {
      throw error;
    }
  }

  static async getEarningsLastSevenDays(): Promise<
    | {
        dt: DateTime;
        sum: number;
      }[]
    | any
  > {
    const today = DateTime.now();
    let lastSevenDays = [];

    for (let count = 0; count < 7; count++) {
      count === 0
        ? lastSevenDays.push({ dt: today, sum: 0 })
        : lastSevenDays.push({ dt: today.minus({ days: count }), sum: 0 });
    }

    try {
      const result = await db.query(`
      SELECT 
        date_trunc(
          'day', earnings.datetime
        ) as day, 
        SUM(amount) 
      FROM 
        earnings 
      WHERE 
        earnings.datetime > now() - interval '7' day 
      GROUP BY 
        day
      `);

      let resultData: any = [];
      if (result.rowCount > 0) {
        result.rows.forEach((row) => {
          resultData.push({
            dt: DateTime.fromJSDate(row.day),
            sum: row.sum,
          });
        });
      }

      let index = 0;
      for (const el of lastSevenDays) {
        for (const row of resultData) {
          if (
            el.dt.day === row.dt.day &&
            el.dt.month === row.dt.month &&
            el.dt.year === row.dt.year
          ) {
            lastSevenDays[index].sum = parseFloat(row.sum);
          }
        }
        index = index + 1;
      }

      return lastSevenDays;
    } catch (error) {
      console.log(error);
    }
  }

  static async getEarningsLastFourWeeks() {
    const dt = DateTime.now();

    // Initialize data
    const lastFourWeeks = [
      {
        dt: dt.startOf('week'),
        sum: 0,
      },
      {
        dt: dt.minus({ weeks: 1 }).startOf('week'),
        sum: 0,
      },
      {
        dt: dt.minus({ weeks: 2 }).startOf('week'),
        sum: 0,
      },
      {
        dt: dt.minus({ weeks: 3 }).startOf('week'),
        sum: 0,
      },
    ];

    try {
      const result = await db.query(`
      SELECT date_trunc('week', earnings.datetime) as week, SUM(amount)
      FROM earnings
      GROUP BY week
      ORDER BY week DESC
      LIMIT 4
      `);

      let resultData: any = [];
      if (result.rowCount > 0) {
        result.rows.forEach((row) => {
          resultData.push({
            dt: DateTime.fromJSDate(row.week),
            sum: row.sum,
          });
        });
      }

      let index = 0;
      for (const el of lastFourWeeks) {
        for (const row of resultData) {
          if (
            el.dt.day === row.dt.day &&
            el.dt.month === row.dt.month &&
            el.dt.year === row.dt.year
          ) {
            lastFourWeeks[index].sum = parseFloat(row.sum);
          }
        }
        index = index + 1;
      }

      return [
        {
          range: `${dt.startOf('week').toLocaleString()}-${dt
            .startOf('week')
            .endOf('week')
            .toLocaleString()}`,
          sum: lastFourWeeks[0].sum,
        },
        {
          range: `${dt
            .minus({ weeks: 1 })
            .startOf('week')
            .toLocaleString()}-${dt
            .minus({ weeks: 1 })
            .startOf('week')
            .endOf('week')
            .toLocaleString()}`,
          sum: lastFourWeeks[1].sum,
        },
        {
          range: `${dt
            .minus({ weeks: 2 })
            .startOf('week')
            .toLocaleString()}-${dt
            .minus({ weeks: 2 })
            .startOf('week')
            .endOf('week')
            .toLocaleString()}`,
          sum: lastFourWeeks[2].sum,
        },
        {
          range: `${dt
            .minus({ weeks: 3 })
            .startOf('week')
            .toLocaleString()}-${dt
            .minus({ weeks: 3 })
            .startOf('week')
            .endOf('week')
            .toLocaleString()}`,
          sum: lastFourWeeks[3].sum,
        },
      ];
    } catch (error) {
      throw error;
    }
  }

  static async getEarningsLastSixMonths() {
    const dt = DateTime.now();

    // Initialize data
    const lastSixMonths = [
      {
        dt: dt.startOf('month'),
        sum: 0,
      },
      {
        dt: dt.minus({ months: 1 }).startOf('month'),
        sum: 0,
      },
      {
        dt: dt.minus({ months: 2 }).startOf('month'),
        sum: 0,
      },
      {
        dt: dt.minus({ months: 3 }).startOf('month'),
        sum: 0,
      },
      {
        dt: dt.minus({ months: 4 }).startOf('month'),
        sum: 0,
      },
      {
        dt: dt.minus({ months: 5 }).startOf('month'),
        sum: 0,
      },
    ];

    try {
      const result = await db.query(`
      SELECT 
        date_trunc(
          'month', earnings.datetime
        ) as month, 
        SUM(amount) 
      FROM 
        earnings 
      WHERE 
        earnings.datetime > now() - interval '6' month 
      GROUP BY 
        month
      `);

      let resultData: any = [];
      if (result.rowCount > 0) {
        result.rows.forEach((row) => {
          resultData.push({
            dt: DateTime.fromJSDate(row.month),
            sum: row.sum,
          });
        });
      }

      let index = 0;
      for (const el of lastSixMonths) {
        for (const row of resultData) {
          if (
            el.dt.day === row.dt.day &&
            el.dt.month === row.dt.month &&
            el.dt.year === row.dt.year
          ) {
            lastSixMonths[index].sum = parseFloat(row.sum);
          }
        }
        index = index + 1;
      }

      return [
        {
          month: lastSixMonths[0].dt.toLocaleString({
            month: 'long',
            year: 'numeric',
          }),
          sum: lastSixMonths[0].sum,
        },
        {
          month: lastSixMonths[1].dt.toLocaleString({
            month: 'long',
            year: 'numeric',
          }),
          sum: lastSixMonths[1].sum,
        },
        {
          month: lastSixMonths[2].dt.toLocaleString({
            month: 'long',
            year: 'numeric',
          }),
          sum: lastSixMonths[2].sum,
        },
        {
          month: lastSixMonths[3].dt.toLocaleString({
            month: 'long',
            year: 'numeric',
          }),
          sum: lastSixMonths[3].sum,
        },
        {
          month: lastSixMonths[4].dt.toLocaleString({
            month: 'long',
            year: 'numeric',
          }),
          sum: lastSixMonths[4].sum,
        },
        {
          month: lastSixMonths[5].dt.toLocaleString({
            month: 'long',
            year: 'numeric',
          }),
          sum: lastSixMonths[5].sum,
        },
      ];
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
