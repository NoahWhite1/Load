import { FreightLoad } from "../freight-load/freight-load.module";

export class Person { 

  pId:number = 0;
  username:string = " ";
  password:string = " ";
  firstName:string = " ";
  lastName:string = " ";
  aLevel:number = 0;
  email:string = " ";
  freightLoads:Array<FreightLoad> = [];
  phone:string = " ";

  constructor(
    pId:number,
    username:string,
    password:string,
    firstName:string,
    lastName:string,
    aLevel:number,
    email:string,
    freightLoads:FreightLoad[],
    phone:string
    ){
    this.pId = pId;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.aLevel = aLevel;
    this.email = email;
    this.freightLoads = freightLoads;
    this.phone = phone;
  }
}
