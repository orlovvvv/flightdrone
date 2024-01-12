import { Position } from "@capacitor/geolocation";

export type GeolocationState = {
    position: Position | null | undefined;
};