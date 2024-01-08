export type Weather = {
    locationName: string
    temp: number
}

export type WeatherState = {
    weather: Weather | null | undefined
}