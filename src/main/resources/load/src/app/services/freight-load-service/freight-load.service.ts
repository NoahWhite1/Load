import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { FreightLoad } from 'src/app/modules/freight-load/freight-load.module';

@Injectable({
  providedIn: 'root'
})
export class FreightLoadService {

  url:string = `https://api.tomtom.com`;
  backendUrl:string = `http://localhost:8080`;
  currentFreight:any;
  
  constructor(private http:HttpClient) { }

  async loadRoute(lat1:number,long1:number,lat2:number,long2:number):Promise<any>{
    const route:any = await this.http.get(this.url + `/routing/1/calculateRoute/${lat1},${long1}:${lat2},${long2}/json?key=DItvwpSk1mhrPMbC0EpsQGtaqlaBKvkG`).toPromise();
    return route;
  }

  async getCordinates(address:string):Promise<any>{
    const cordinates = await this.http.get(this.url + `/search/2/geocode/${address}.json?countrySet=US&key=DItvwpSk1mhrPMbC0EpsQGtaqlaBKvkG`).toPromise();
    return cordinates;
  }

  async createFreightLoad(newFreight:any, personId:number){
    const freight = await this.http.post(this.backendUrl + `/freightLoads/${personId}`,newFreight).toPromise();
    return freight;
  }

  async getFreightLoadById(id:number){
    const freight = await this.http.get(this.backendUrl + `/freightLoads/${id}`).toPromise();
    return freight;
  }

  async getAllFreightLoads():Promise<Array<FreightLoad>>{
    const freight:Array<any> = await this.http.get<Array<any>>(this.backendUrl + `/freightLoads`).toPromise();
    return freight;
  }

  async updateFreightLoad(newFreight:any){
    const freight = await this.http.put<FreightLoad>(this.backendUrl + `/freightLoads`,newFreight).toPromise();
    return freight;
  }

  async deleteFreightLoad(id:number){
    const freight = await this.http.delete(this.backendUrl + `/freightLoads/${id}`).toPromise();
    return freight;
  }

}
