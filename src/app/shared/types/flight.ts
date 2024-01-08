import { Collection } from './collection';
import { Drone } from './drone';
import { Profile } from './profile';

export type Flights = Flight[];

export type Flight = {
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

export type AddFlight = Omit<
  Flight,
  '$id' | '$createdAt' | '$updatedAt' | '$databaseId' | '$collectionId' | 'latitude' | 'longitude'
>;
export type EditFlight = { id: Flight['$id']; data: AddFlight };
export type RemoveFlight = Flight['$id'];
