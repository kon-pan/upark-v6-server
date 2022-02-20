import { IPostgresVehicle } from 'src/interfaces/interface.db';
import db from '../db/db.config';

export default class Vehicle {
  static async get(
    driverId: number
  ): Promise<{ vehicleId: number; name: string; licensePlate: string }[]> {
    try {
      const result = await db.query(
        'SELECT * FROM vehicles WHERE driver_id=$1',
        [driverId]
      );

      let data: {
        vehicleId: number;
        name: string;
        licensePlate: string;
      }[] = [];

      if (result.rowCount > 0) {
        (result.rows as IPostgresVehicle[]).forEach((vehicle) => {
          data.push({
            vehicleId: vehicle.id,
            name: vehicle.name,
            licensePlate: vehicle.license_plate,
          });
        });

        return data;
      } else {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async insertOne(
    driverId: number,
    vehicleName: string,
    licensePlate: string
  ): Promise<boolean> {
    try {
      const result = await db.query(
        `
      INSERT INTO vehicles(name, license_plate, driver_id) 
      VALUES ($1, $2, $3)
      `,
        [vehicleName, licensePlate, driverId]
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
