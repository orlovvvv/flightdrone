import { Collection } from './collection';
import { Drones } from './drone';
import { Flights } from './flight';

export type Profile = {
  pilotNumber: string;
  operatorNumber: string;
  licenseA1: boolean;
  licenseA2: boolean;
  licenseA3: boolean;
  flights: Flights;
  drones: Drones;
} & Collection;

export type ProfileState = {
  profile: Profile | null | undefined;
  loaded: boolean;
  error: string | null;
};

export type AddProfile = Omit<Profile, '$id'>;
export type EditProfile = { id: Profile['$id']; data: AddProfile };
export type RemoveProfile = Profile['$id'];
