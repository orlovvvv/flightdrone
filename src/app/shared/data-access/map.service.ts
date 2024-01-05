import { ElementRef, Injectable, computed, signal } from '@angular/core'
import { GoogleMap } from '@capacitor/google-maps'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // todo: Create a map service and move dependency layer in here
  private newMapRef = signal<ElementRef<HTMLElement> | undefined>(undefined)
  private newMap = signal<GoogleMap | undefined>(undefined)
  constructor() { }

  _mapRef = computed(() => this.newMapRef())
  _map = computed(() => this.newMap())

  async createMap() {
    const head = document.head
    //* Prevent font download when map requests data
    const insertBefore = head.insertBefore
    head.insertBefore = <T extends Node>(
      newElement: T,
      referenceElement: Node
    ): T => {
      if (
        newElement instanceof Element &&
        newElement?.hasAttribute('href') &&
        newElement?.getAttribute('href')?.includes('fonts.googleapis')
      ) {
        return newElement
      }

      insertBefore.call(head, newElement, referenceElement)
      return newElement
    }

    const map = await GoogleMap.create({
      id: 'map',
      element: this.newMapRef()!.nativeElement,
      apiKey: environment.apiKey,
      region: 'pl',
      config: {
        center: {
          lat: 52.237049,
          lng: 21.017532,
        },
        restriction: {
          latLngBounds: {
            west: 14.075,
            south: 48.855,
            east: 24.155,
            north: 54.852,
          },
          strictBounds: false,
        },
        panControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        zoom: 7,
        mapId: 'ee2cd9275b9b5193',
      },
    })
    return map
  }
}
