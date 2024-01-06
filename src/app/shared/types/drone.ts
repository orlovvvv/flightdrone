import { Collection } from "./collection"
import { Flights } from "./flight"


export type Drones = Drone[]

export type Drone = {
    model: string
    serial: string
    manufacturer: string
    weight: number
    flights: Flights
} & Collection

export type DroneState = {
    drones: Drones
    loaded: boolean
    error: string | null
}

export type AddDrone = Omit<Drone, 'id'>
export type EditDrone = { id: Drone['id']; data: AddDrone }
export type RemoveDrone = Drone['id']