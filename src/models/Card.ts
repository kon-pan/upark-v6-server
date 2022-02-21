import { DateTime } from 'luxon';
import { ICard } from '../interfaces/interface.main';
import db from '../db/db.config';

export default class Card {
  static async insert(card: ICard): Promise<boolean> {
    // Starting datetime
    const nowUtc = DateTime.now().toUTC();
    // Expiration datetime
    const expireUtc = nowUtc.plus({ minutes: 60 });

    try {
      const result = await db.query(
        `
      INSERT INTO active_cards(license_plate, vehicle_name, duration, cost, starts_at, expires_at, driver_id, address_id) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          card.vehicleLicensePlate,
          card.vehicleName,
          card.duration,
          card.cost,
          nowUtc.toISO(),
          expireUtc.toISO(),
          card.driverId,
          card.addressId,
        ]
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
}
