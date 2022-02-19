export interface IPostgresDriver {
  id: number;
  first_name?: string | null;
  last_name?: string | null;
  display_name: string;
  email: string;
  password?: string | null;
  registered_on: string;
  registered_with: string;
  accumulated_time: number;
}

export interface IPostgresAddress {
  id: number;
  name: string;
  available: number;
  occupied: number;
  position: [number, number];
}
