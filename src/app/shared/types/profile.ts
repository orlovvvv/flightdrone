import { Collection } from "./collection"

export type Profile = {
    userId: string
    pilotNumber: string
    operatorNumber: string
    licenseA1: boolean
    licenseA2: boolean
    licenseA3: boolean
    Profiles: [] // todo: create type
} & Collection

export type ProfileState = {
    profile: Profile | null | undefined
    loaded: boolean,
    error: string | null
}

export type AddProfile = Omit<Profile, 'id'>
export type EditProfile = { id: Profile['id']; data: AddProfile }
export type RemoveProfile = Profile['id']