import { Inject } from "@angular/core";
import { Person } from "../person/person.module";

export class FreightLoad {

  f_id:number = 0;
  rate:number = 0;
  startAddress:string = " ";
  endAddress:string = " ";
  gasCost:number = 0;
  driverPay:number = 0;
  loadCost:number = 0;
  insuranceCost:number = 0;
  maintenanceCost:number = 0;
  freightBroker:Person = new Person(0, " ", " ", " ", " ", 0, " ", [], " ");
  status:number = 0;

  constructor(
    f_id:number,
    rate:number,
    startAddress:string, 
    endAddress:string,
    gasCost:number,
    driverPay:number,
    loadCost:number,
    insuranceCost:number,
    maintenanceCost:number,
    status:number,
    freightBroker:Person
  ){
    this.f_id = f_id;
    this.rate = rate;
    this.startAddress = startAddress;
    this.endAddress = endAddress;
    this.gasCost = gasCost;
    this.driverPay = driverPay;
    this.loadCost = loadCost;
    this.insuranceCost = insuranceCost;
    this.maintenanceCost = maintenanceCost;
    this.status = status;
    this.freightBroker = freightBroker;
  }

 }
