import { Collection } from './collection';
import { Flights } from './flight';
import { Profile } from './profile';

export type Drones = Drone[];

export type Drone = {
  model: string;
  serial: string;
  manufacturer: string;
  weight: number;
  flights: Flights;
  profile: Profile;
} & Collection;

export type DroneState = {
  drones: Drones;
  loaded: boolean;
  error: string | null;
};

export type AddDrone = Partial<{
  model: string;
  serial: string;
  manufacturer: string;
  weight: number;
}>;
export type EditDrone = { id: Drone['$id']; data: AddDrone };
export type RemoveDrone = Drone['$id'];
