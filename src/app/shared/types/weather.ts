export type Weather = {
    queryCost: number
    latitude: number
    longitude: number
    resolvedAddress: string
    address: string
    timezone: string
    tzoffset: number
    currentConditions: {
        temp: number
        precipprob: number
        windspeed: number
        winddir: number
        conditions: string
    }
}

export type Day = {
    datetime: string
    datetimeEpoch: number
    temp: number
    precip: number
    conditions: string

}
export type WeatherState = {
    weather: Weather | undefined
    error: any | null
}