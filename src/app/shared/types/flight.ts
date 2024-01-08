import { Collection } from './collection';
import { Drone } from './drone';
import { Profile } from './profile';

export type Flights = Flight[];

export type Flight = {
  latitude: string;
  longitude: string;
  duration: string;
  range: string;
  height: string;
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
  '$id' | '$createdAt' | '$updatedAt' | '$databaseId' | '$collectionId'
>;
export type EditFlight = { id: Flight['$id']; data: AddFlight };
export type RemoveFlight = Flight['$id'];
