import { DateTime } from 'luxon';
import { ICard } from '../interfaces/interface.main';
import db from '../db/db.config';
import { IPostgresActiveCard } from 'src/interfaces/interface.db';

export default class Card {
  static async insert(card: ICard): Promise<boolean> {
    let nowUtc;
    let expireUtc;

    // Check if card is short/long term
    if (card.duration > 300) {
      nowUtc = DateTime.fromISO(card.startsAt).toUTC();
      expireUtc = nowUtc.plus({ minutes: card.duration });
    } else {
      // Starting datetime
      nowUtc = DateTime.now().toUTC();
      // Expiration datetime
      expireUtc = nowUtc.plus({ minutes: card.duration });
    }

    try {
      const result = await db.query(
        `
      WITH new_card AS (
        INSERT INTO active_cards(
          license_plate, vehicle_name, duration, 
          cost, starts_at, expires_at, driver_id, 
          address_id
        ) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
      ) 
      UPDATE 
        addresses 
      SET 
        occupied = occupied + 1 
      WHERE 
        addresses.id = (SELECT address_id FROM new_card)
      `,
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

  static async select(
    value: 'active-user' | 'active-all',
    driverId?: number
  ): Promise<ICard[]> {
    switch (value) {
      case 'active-user':
        try {
          const response = await db.query(
            `
            SELECT
              active_cards.id, 
              active_cards.driver_id, 
              active_cards.address_id, 
              addresses.name as address_name, 
              active_cards.vehicle_name, 
              active_cards.license_plate, 
              active_cards.cost,
              active_cards.duration,
              active_cards.starts_at, 
              active_cards.expires_at 
            FROM 
              active_cards 
              JOIN addresses ON active_cards.address_id = addresses.id 
            WHERE 
              driver_id = $1 
            ORDER BY 
              id DESC
            `,
            [driverId]
          );

          console.log(response);

          if (response.rowCount > 0) {
            let activeCards: ICard[] = [];
            (response.rows as IPostgresActiveCard[]).forEach((card) => {
              activeCards.push({
                id: card.id,
                driverId: card.driver_id,
                addressId: card.address_id,
                addressName: card.address_name,
                vehicleName: card.vehicle_name,
                vehicleLicensePlate: card.license_plate,
                cost: card.cost,
                duration: card.duration,
                startsAt: card.starts_at,
                expiresAt: card.expires_at,
              });
            });

            return activeCards;
          }

          return [] as ICard[];
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  }
}
