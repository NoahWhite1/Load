import { JsonpClientBackend } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { config } from 'rxjs';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { DirectionService } from 'src/app/services/direction-service/direction.service';
import { google } from "google-maps";
declare var google : google;

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapDisplayComponent implements OnInit {

  arrivalTime:string = "arrival";
  address1:any = "address1";
  state1:string = "state1";
  address2:string = "address2";
  state2:string = "state2";
  departureTime:string = "departure";
  lengthInMeters:number = 0;
  trafficDelayInSeconds:number = 0;
  travelTimeInSeconds:number = 0;
  rate:number = 0;
  location1:any = {};
  location2:any = {};
  map:any = {};
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  constructor(private freightServ:FreightLoadService, private cdr:ChangeDetectorRef, private directionServ:DirectionService) { }

  async ngOnInit() {
    this.loadRoute(this.address1,this.state1, this.address2, this.state2);
    //creating the map
  //   const map = tt.map({
  //     key: 'DItvwpSk1mhrPMbC0EpsQGtaqlaBKvkG',
  //     container: 'map',
  //     style: 'tomtom://vector/1/basic-main'
  //   });
    
  //   map.addControl(new tt.NavigationControl());
  //   this.map = map;

  //   //configuration to add traffic layer
  //   let config = {
  //     key: 'DItvwpSk1mhrPMbC0EpsQGtaqlaBKvkG',
  //     style: 'tomtom://vector/1/relative',
  //     refresh: 10000
  //   };
  //   let obj = await this.directionServ.getFreightRoute();

  //   map.on('load', function() {
  //     map.addTier(new tt.TrafficFlowTilesTier(config));
  //     let points:Array<any> = [];
  //     let bounds = new tt.LngLatBounds();
  
  //     points = obj.routes[0].legs[0].points;
  //     console.log(points);

  //     let newPoints:Array<any> = [];

  //     points.forEach(function(point) {
  //       bounds.extend(tt.LngLat.convert(point));
  //   });


  //     for(let point of points){
  //       let tempPoint = new tt.LngLat(point.longitude, point.latitude);
  //       newPoints.push(tempPoint);
  //     }
  //     console.log(newPoints);
      
  //     map.addLayer({
  //       'id': '123',
  //       'type': 'line',
  //       'source': {
  //           'type': 'geojson',
  //           'data': {
  //               'type': 'FeatureCollection',
  //               'features': [
  //                   {
  //                       'type': 'Feature',
  //                       'geometry': {
  //                           'type': 'LineString',
  //                           'properties': {},
  //                           'coordinates':[
  //                             [this.location1.position.lat,this.location1.position.lon],
  //                             [this.location2.position.lat,this.location2.position.lon]
  //                           ]
  //                       }
  //                   }
  //               ]
  //           }
  //       },
  //       'layout': {
  //           'line-cap': 'round',
  //           'line-join': 'round'
  //       },
  //       'paint': {
  //           'line-color': '#ff0000',
  //           'line-width': 9
  //       }
  //   });
  //   });


  }


  async loadRoute(address1:string, state1:string, address2:string, state2:string){    
    this.location1 = await this.findAddress(address1,state1);
    this.location2 = await this.findAddress(address2,state2);
    let route = await this.freightServ.loadRoute(this.location1.position.lat,this.location1.position.lon,this.location2.position.lat,this.location2.position.lon);
    this.arrivalTime = route.routes[0].summary.arrivalTime;
    this.departureTime = route.routes[0].summary.departureTime;
    this.lengthInMeters = route.routes[0].summary.lengthInMeters;
    this.travelTimeInSeconds = route.routes[0].summary.travelTimeInSeconds;
    this.trafficDelayInSeconds = route.routes[0].summary.trafficDelayInSeconds;
    this.cdr.detectChanges();
  }

  async findAddress(address:string,state:string){
    let results = await this.freightServ.getCordinates(address);

    for(let i = 0; i < JSON.parse(results.results.length); i++){
      if(results.results[i].address.countrySubdivision == state.toUpperCase()){
        return results.results[i];
      }
    }
  }

   findFirstBuildingLayerId() {
    var layers = this.map.getStyle().layers;
    for (var index in layers) {
        if (layers[index].type === 'fill-extrusion') {
            return layers[index].id;
        }
    }
    throw new Error('Map style does not contain any layer with fill-extrusion type.');
 }
}

