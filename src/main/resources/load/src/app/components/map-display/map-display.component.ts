import { JsonpClientBackend } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { config } from 'rxjs';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { DirectionService } from 'src/app/services/direction-service/direction.service';
import { Output, EventEmitter } from '@angular/core';
import tt, { GeoJSONFeature, GeoJSONSource, Marker, Point, Popup } from '@tomtom-international/web-sdk-maps';
import tts, { Address, CalculateRouteResult, GeoJsonRouteProperties, Geometry, GeometrySearchResult, LatLng, LngLat, LngLatLike, LngLatObjectRepresentation, LngLatRequestParam, Poi, PoiSearchResponse, PoiSearchResult, PoiSearchSummary, Route, RouteSummary, SearchResult } from '@tomtom-international/web-sdk-services'
import { GeoJsonObject, Position } from 'geojson';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MapDisplayComponent implements AfterViewInit {

  @Output() arrivalTimeChanged = new EventEmitter<string>();
  @Output() departureTimeChanged = new EventEmitter<string>();
  @Output() lengthInMetersChanged = new EventEmitter<number>();
  @Output() trafficDelayInSecondsChanged = new EventEmitter<number>();
  @Output() travelTimeInSecondsChanged = new EventEmitter<number>();
  isLoaded:boolean = false;
  constructor(private freightServ: FreightLoadService, private cdr: ChangeDetectorRef, private directionServ: DirectionService) { }

  ngAfterViewInit() {
  }

  async initalizeMap(routePoints: tt.LngLat[]) {
    const map = tt.map({
      key: 'DItvwpSk1mhrPMbC0EpsQGtaqlaBKvkG',
      container: 'map',
      zoom: 6,
      style: 'https://api.tomtom.com/style/1/style/20.4.5-*/?map=basic_night&poi=poi_main',
    });

    map.on('load', () => {
      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());
      map.showTrafficFlow();
      this.plotFreightRoute(map, routePoints);
    });

    this.createMarker(routePoints[0],"Pickup", map);
    this.createMarker(routePoints[routePoints.length - 1], "Delivery", map);

    let center: number = Math.round(routePoints.length / 2);
    map.jumpTo({
      center:routePoints[center]
    })
  
    return map;
  }

 
  createMarker(routePoint:tt.LngLat, markerText:string, map:tt.Map)
  {
    let marker:tt.Marker = new tt.Marker();
    marker.setLngLat(routePoint);
    marker.setPopup(new tt.Popup({ offset: 1 }).setText(markerText))
    marker.addTo(map);
  }

  async plotFreightRoute(map: tt.Map, geoCords: tt.LngLat[]) {
    let positions: Position[] = [];
    for (let i = 0; i < geoCords.length; i++) {
      positions.push([geoCords[i].lng, geoCords[i].lat]);
    }

    try {
      await this.setMapBounds(map, geoCords);
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              'properties': {},
              'type': 'Feature',
              'geometry': {
                'type': 'LineString',
                'coordinates': positions
              }
            }]
          }
        },
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-color': '#FFFF00',
          'line-width': 5
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async loadRoute(address1: string, address2: string) {
    let startCord:tt.LngLat = await this.findAddressCords(address1);
    let endCord:tt.LngLat = await this.findAddressCords(address2);
    let routeResult: CalculateRouteResult = await this.freightServ.loadRoute(startCord, endCord);
    let newRoute: Route = routeResult.routes[0];
    let newRoutePoints: LatLng[] = newRoute.legs[0].points;
    let routePointsConverted: tt.LngLat[] = this.convertLatLngArray(newRoutePoints);

    this.setPageData(newRoute.summary);

    await this.initalizeMap(routePointsConverted);
    this.isLoaded = true;
  }

  convertLatLng(position:LatLng):tt.LngLat
  {
    let locPos:string = JSON.stringify(position);
    let posArray:string[] = locPos.split(',')
    posArray[0] = posArray[0].replace(/^(-)|[^0-9.,-]+/g, '');
    posArray[1] = posArray[1].replace(/^(-)|[^0-9.,-]+/g, '');
    let convertedCords:tt.LngLat = new tt.LngLat(parseFloat(posArray[1]), parseFloat(posArray[0]));
    return convertedCords;
  }

  convertLatLngArray(positions:LatLng[]):tt.LngLat[]
  {
    let modifiedPositions:tt.LngLat [] = [];
    for(let pos of positions){
      modifiedPositions.push(this.convertLatLng(pos));
    }
    return modifiedPositions
  }

  async findAddressCords(address:string):Promise<LngLat>{
    let loc:SearchResult = await this.findAddress(address);
    let convertedCords:LngLat = this.convertLatLng(loc.position);
    return convertedCords;
}

  setPageData(routeSummary: RouteSummary) {

    this.arrivalTimeChanged.emit(routeSummary.arrivalTime);
    this.departureTimeChanged.emit(routeSummary.departureTime);
    this.lengthInMetersChanged.emit(routeSummary.lengthInMeters);
    this.travelTimeInSecondsChanged.emit(routeSummary.travelTimeInSeconds);
    this.trafficDelayInSecondsChanged.emit(routeSummary.trafficDelayInSeconds);
  }

  async findAddress(address: string):Promise<PoiSearchResult> {
    let searchResponse:PoiSearchResponse = await this.freightServ.getCordinates(address);
    let searchResults:PoiSearchResult[] = searchResponse.results;
    for (let i = 0; i < searchResults.length; i++) {
      if (address.includes(searchResults[i].address.countrySubdivision)) {
        return searchResults[i];
      }
    }
  }

  async setMapBounds(map: tt.Map, mapCords: tt.LngLat[]) {
    let mapBounds: tt.LngLatBounds = new tt.LngLatBounds();
    mapCords.forEach((cord: LngLat) => {
      mapBounds.extend(cord);
    });
    map.fitBounds(mapBounds, {
      duration: 0,
      padding: 10
    });
  }
}

