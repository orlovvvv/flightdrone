import { Collection } from './collection';
import { Drone } from './drone';
import { Profile } from './profile';

export type Flights = Flight[];

export type Flight = {
  [key: string]: any;
  latitude: number;
  longitude: number;
  duration: number;
  range: number;
  height: number;
  drone: Drone;
  profile: Profile;
} & Collection;

export type FlightState = {
  flights: Flights;
  loaded: boolean;
  error: any | null;
};

export type AddFlight = Partial<{
  duration: number;
  range: number;
  height: number;
  drone: string;
}>;
export type EditFlight = { id: Flight['$id']; data: AddFlight };
export type RemoveFlight = Flight['$id'];
