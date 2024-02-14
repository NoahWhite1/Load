import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { FreightLoad } from 'src/app/modules/freight-load/freight-load.module';
import { Person } from 'src/app/modules/person/person.module';
import tts, { CalculateRouteResult, LngLat, PoiSearchResponse } from '@tomtom-international/web-sdk-services'

@Injectable({
  providedIn: 'root'
})
export class FreightLoadService {

  url:string = `https://api.tomtom.com`;
  backendUrl:string = `http://localhost:8080`;
  person:Person = new Person(0, " ", " ", " ", " ", 0, " ", [], " ");
  currentFreight:FreightLoad = new FreightLoad(0, 0, "", "", 0, 0, 0, 0, 0, 0, this.person);
  
  constructor(private http:HttpClient) { }

  async loadRoute(cord1:tt.LngLat, cord2:tt.LngLat):Promise<CalculateRouteResult>{
    const route:any = await this.http.get<CalculateRouteResult>(this.url + `/routing/1/calculateRoute/${cord1.lat},${cord1.lng}:${cord2.lat},${cord2.lng}/json?avoid=unpavedRoads&traffic=true&key=DItvwpSk1mhrPMbC0EpsQGtaqlaBKvkG`).toPromise();
    return route;
  }

  async getSearchAddresses(address:string):Promise<PoiSearchResponse>{
    const cordinates = await this.http.get<PoiSearchResponse>(this.url + `/search/2/geocode/${address}.json?countrySet=US&key=DItvwpSk1mhrPMbC0EpsQGtaqlaBKvkG`).toPromise();
    return cordinates;
  }

  async createFreightLoad(newFreight:FreightLoad, personId:number):Promise<FreightLoad>{
    const freight:FreightLoad = await this.http.post<FreightLoad>(this.backendUrl + `/freightLoads/${personId}`,newFreight).toPromise();
    return freight;
  }

  async getFreightLoadById(id:number):Promise<FreightLoad>{
    const freight:FreightLoad = await this.http.get<FreightLoad>(this.backendUrl + `/freightLoads/${id}`).toPromise();
    return freight;
  }

  async getAllFreightLoads():Promise<Array<FreightLoad>>{
    const freight:Array<FreightLoad> = await this.http.get<Array<FreightLoad>>(this.backendUrl + `/freightLoads`).toPromise();
    return freight;
  }

  async updateFreightLoad(newFreight:FreightLoad):Promise<FreightLoad>{
    const freight:FreightLoad = await this.http.put<FreightLoad>(this.backendUrl + `/freightLoads`,newFreight).toPromise();
    return freight;
  }

  async deleteFreightLoad(id:number){
    const freight = await this.http.delete(this.backendUrl + `/freightLoads/${id}`).toPromise();
    return freight;
  }

}
