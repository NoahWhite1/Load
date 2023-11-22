import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {


  url:string = "https://api.tomtom.com/routing/1/calculateRoute/52.50931%2C13.42936%3A52.50274%2C13.43872/json?avoid=unpavedRoads&key=DItvwpSk1mhrPMbC0EpsQGtaqlaBKvkG";
  
  constructor(private http:HttpClient) {

   }

   async getFreightRoute():Promise<any>{
    const freightRoute = this.http.get<any>(this.url).toPromise();
    return freightRoute;
   }
}
