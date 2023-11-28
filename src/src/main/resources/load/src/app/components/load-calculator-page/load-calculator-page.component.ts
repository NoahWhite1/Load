import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { MapDisplayComponent } from '../map-display/map-display.component';

@Component({
  selector: 'app-load-calculator-page',
  templateUrl: './load-calculator-page.component.html',
  styleUrls: ['./load-calculator-page.component.css'],

})
export class LoadCalculatorPageComponent implements AfterViewInit  {

  @Output("refreshTable") refreshTable : EventEmitter<any> = new EventEmitter;
  address1:string = "";
  state1:string = "";
  address2:string = "";
  state2:string = "";
  gas_cost:number = 0;
  insurance_cost:number = 0;
  load_cost:number = 0;
  maintenance_cost:number = 0;
  truck_driver_pay:number = 0;
  rate:number = 0;
  isCreating:boolean = false;

  constructor(private freightServ:FreightLoadService, private personServ:PeopleService, private route:Router, private cdr:ChangeDetectorRef) { }

  ngAfterViewInit (): void {
    
    this.cdr.detectChanges();


    if(window.location.href.includes("my")){
      this.isCreating = true;
    }
    else{
      this.isCreating = false;
      this.address1 = this.freightServ.currentFreight.startAddress.substring(0,this.freightServ.currentFreight.startAddress.length - 2);
      this.state1 = this.freightServ.currentFreight.startAddress.substring(this.freightServ.currentFreight.startAddress.length, this.freightServ.currentFreight.startAddress.length - 2);
      this.address2 = this.freightServ.currentFreight.endAddress.substring(0,this.freightServ.currentFreight.endAddress.length - 2);
      this.state2 = this.freightServ.currentFreight.endAddress.substring(this.freightServ.currentFreight.endAddress.length, this.freightServ.currentFreight.endAddress.length - 2);
      this.gas_cost = this.freightServ.currentFreight.gasCost;
      this.insurance_cost = this.freightServ.currentFreight.insuranceCost;
      this.load_cost = this.freightServ.currentFreight.loadCost;
      this.maintenance_cost = this.freightServ.currentFreight.maintenanceCost;
      this.truck_driver_pay = this.freightServ.currentFreight.driverPay;
      this.rate = this.freightServ.currentFreight.rate;
    }
    this.cdr.detectChanges();
  }

  async updateMapRoute(){

    let newFreight:any = {};

    if(this.isCreating === true){
      newFreight = {
      "f_id" : 0,
      "rate" : this.rate,
      "startAddress" : this.address1 + " " + this.state1.toUpperCase(),
      "endAddress" : this.address2 + " " + this.state2.toUpperCase(),
      "gasCost" : this.gas_cost,
      "driverPay" : this.truck_driver_pay,
      "loadCost" : this.load_cost,
      "insuranceCost" : this.insurance_cost,
      "maintenanceCost" : this.maintenance_cost
      }
    }
    else
    {
      newFreight = {
        "f_id" : this.freightServ.currentFreight.f_id,
        "rate" : this.rate,
        "startAddress" : this.address1 + " " + this.state1.toUpperCase(),
        "endAddress" : this.address2 + " " + this.state2.toUpperCase(),
        "gasCost" : this.gas_cost,
        "driverPay" : this.truck_driver_pay,
        "loadCost" : this.load_cost,
        "insuranceCost" : this.insurance_cost,
        "maintenanceCost" : this.maintenance_cost,
        "freightBroker" : this.personServ.person
        }
    }

    
    if(this.isCreating === true){
      await this.freightServ.createFreightLoad(newFreight, this.personServ.person.pId);
    }
    else{
      this.freightServ.currentFreight = await this.freightServ.updateFreightLoad(newFreight);
    }
    this.cdr.detectChanges();
    this.refreshTable.emit();
    this.ngAfterViewInit();
    this.cdr.detectChanges();
  }

}
