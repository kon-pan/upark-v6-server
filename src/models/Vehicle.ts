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
      } else {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
