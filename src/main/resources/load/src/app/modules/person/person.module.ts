import { FreightLoad } from "../freight-load/freight-load.module";

export class Person { 

  pId:number = 0;
  rate:number;
  username:string = " ";
  password:string = " ";
  firstname:string = " ";
  lastname:string = " ";
  aLevel:number = 0;
  email:string = " ";
  freightLoads:Array<FreightLoad> = [];
  phone:string = " ";

  constructor(pId:number, rate:number, username:string, password:string, firstname:string, lastName:string, aLevel:number,email:string, freightLoads:Array<FreightLoad>, phone:string){
    this.pId = pId;
    this.rate = rate;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastName;
    this.aLevel = aLevel;
    this.email = email;
    this.freightLoads = freightLoads;
    this.phone = phone;
  }
}
