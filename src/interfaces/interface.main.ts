export interface IActiveCard {
  id: number;
  driverId: number;
  addressId: number;
  addressName: string;
  vehicleName: string;
  vehicleLicensePlate: string;
  cost: number;
  duration: number;
  startsAt: string;
  expiresAt: string;
}

export interface IInactiveCard {
  id: number;
  driverId: number;
  addressId: number;
  addressName: string;
  vehicleName: string;
  licensePlate: string;
  cost: number;
  duration: number;
  startsAt: string;
  expired: boolean;
  cancelled: boolean;
}
