import { Position } from '@capacitor/geolocation';
import { GeolocationService } from './geolocation.service';
import { signalSlice } from 'ngxtension/signal-slice';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  map,
  merge,
  of,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather, WeatherState } from 'src/app/shared/types/weather';


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private geolocationService = inject(GeolocationService);

  //  initial state
  private initialState: WeatherState = {
    weather: undefined,
    error: null,
  };
  // sources
  private error$ = new Subject<any>();

  private sources$ = merge(this.error$.pipe(map((error) => ({ error }))));

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      get: (_, $: Observable<Position>) =>
        $.pipe(
          switchMap((coordinates) =>
            this.getWeather(coordinates.coords.latitude, coordinates.coords.longitude).pipe(
              map((weather) => ({ weather })),
              catchError((error) => of(error))
            )
          )
        ),
    },
  });

  getWeather(lat: number, log: number) {
    const uri = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${log}/today?unitGroup=metric&elements=datetime%2Ctemp%2Cprecip%2Cconditions%2CdatetimeEpoch&include=days%2Cfcst%2Cobs&key=${environment.weatherApi}&options=preview&contentType=json&lang=pl`;
    return this.http.get<Weather>(uri);
  }

}
