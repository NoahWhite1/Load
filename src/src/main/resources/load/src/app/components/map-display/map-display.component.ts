import { JsonpClientBackend } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { config } from 'rxjs';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { DirectionService } from 'src/app/services/direction-service/direction.service';
import { Output, EventEmitter } from '@angular/core';
import tt, { GeoJSONFeature, GeoJSONSource, Marker, Point, Popup } from '@tomtom-international/web-sdk-maps';
import tts, { GeoJsonRouteProperties, Geometry, Route } from '@tomtom-international/web-sdk-services'
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
  obj: any = {};
  constructor(private freightServ: FreightLoadService, private cdr: ChangeDetectorRef, private directionServ: DirectionService) { }

  ngAfterViewInit() {
  }

  async initalizeMap(routePoints: Array<tt.LngLat>) {

    let points: Array<Point> = new Array<Point>();
    for (let i = 0; i < routePoints.length; i++) {
      let point: Point =
      {
        x: 0,
        y: 0
      }
      point.x = routePoints[i]?.longitude;
      point.y = routePoints[i]?.latitude;
      points.push(point);
    }

    console.log("Point " + JSON.stringify(points[0]));

    let center: number = Math.round(points.length / 2);

    const map = tt.map({
      key: 'DItvwpSk1mhrPMbC0EpsQGtaqlaBKvkG',
      container: 'map',
      center: [points[center].x, points[center].y],
      zoom: 6,
      style: 'https://api.tomtom.com/style/1/style/20.4.5-*/?map=basic_night&poi=poi_main',
    });

    console.log("point center: " + JSON.stringify(points[center]));


    map.on('load', () => {
      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());
      console.log("cords " + points);

      console.log("Marker one pos: " + points[0].x + points[0].y);
      map.showTrafficFlow();
      this.plotFreightRoute(map, points);
    });

   
    // map.jumpTo({
    //   center: [points[center].x, points[center].y],
    // });

    
    let startMarker: Marker = new tt.Marker();
    console.log("first point: " + points[0])
    startMarker.setLngLat(tt.LngLat.convert([points[0].x, points[0].y]));
    startMarker.setPopup(new tt.Popup({offset:1}).setText("Pickup"))
    startMarker.addTo(map);
    let endMarker: Marker = new tt.Marker();
    endMarker.setLngLat(tt.LngLat.convert([points[points.length - 1].x, points[points.length - 1].y]));
    endMarker.setPopup(new tt.Popup({offset:1}).setText("Delivery"))
    endMarker.addTo(map)
    return map;
  }

  async plotFreightRoute(map: tt.Map, geoCords: Array<Point>) {
    let positions: Array<Position> = new Array<Position>();
    for (let i = 0; i < geoCords.length; i++) {
      positions.push([geoCords[i].x, geoCords[i].y]);
    }
    console.log("Positions: " + positions);


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
    let locationOneCords = {
      latitude: 0,
      longitude: 0
    };
    let locationTwoCords = {
      latitude: 0,
      longitude: 0
    };

    let location1 = await this.findAddress(address1);
    locationOneCords.latitude = location1.position.lat;
    locationOneCords.longitude = location1.position.lon;
    let location2 = await this.findAddress(address2);
    locationTwoCords.latitude = location2.position.lat;
    locationTwoCords.longitude = location2.position.lon;
    let route: any = await this.freightServ.loadRoute(locationOneCords.latitude, locationOneCords.longitude, locationTwoCords.latitude, locationTwoCords.longitude);
    let newRoute: Route = route.routes[0];
    console.log(route);
    let routePoints: Array<tt.LngLat> = new Array<tt.LngLat>();
    newRoute.legs[0].points.forEach((point: tt.LngLat) => {
      routePoints.push(point);
    });

    this.arrivalTimeChanged.emit(newRoute.summary.arrivalTime);
    this.departureTimeChanged.emit(newRoute.summary.departureTime);
    this.lengthInMetersChanged.emit(newRoute.summary.lengthInMeters);
    this.travelTimeInSecondsChanged.emit(newRoute.summary.travelTimeInSeconds);
    this.trafficDelayInSecondsChanged.emit(route.routes[0].summary.trafficDelayInSeconds);

    await this.initalizeMap(routePoints);
    this.cdr.detectChanges();
  }

  async findAddress(address: string): Promise<any> {
    let results = await this.freightServ.getCordinates(address);
    for (let i = 0; i < JSON.parse(results.results.length); i++) {
      if (address.includes(results.results[i].address.countrySubdivision)) {
        console.log("resulted address: " + JSON.stringify(results.results[i]));
        return results.results[i];
      }
    }
  }

  async setMapBounds(map: tt.Map, mapCords: Array<Point>) {
    let mapBounds: tt.LngLatBounds = new tt.LngLatBounds();
    mapCords.forEach((cord: Point) => {
      mapBounds.extend([cord.x, cord.y]);
    });
    map.fitBounds(mapBounds, {
      duration: 0,
      padding: 10
    });
  }
}

