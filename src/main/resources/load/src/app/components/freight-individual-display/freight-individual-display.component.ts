import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { MapDisplayComponent } from '../map-display/map-display.component';

@Component({
  selector: 'app-freight-individual-display',
  templateUrl: './freight-individual-display.component.html',
  styleUrls: ['./freight-individual-display.component.css']
})
export class FreightIndividualDisplayComponent implements AfterViewInit {
  
  freightLoad:any = {};
  @ViewChild(MapDisplayComponent)
  map_display:MapDisplayComponent;
  arrivalTime:string = "";
  departureTime:string = "";
  lengthInMeters:number = 0;
  trafficDelayInSeconds:number = 0;
  travelTimeInSeconds:number = 0;
  isUser:boolean = false;
  phone:string = " ";
  constructor(private freightServ:FreightLoadService, private personServ:PeopleService, private cdr:ChangeDetectorRef) { }

  async ngAfterViewInit(){
    
    this.freightLoad = this.freightServ.currentFreight;

    this.phone = this.freightLoad.freightBroker.phone;

    this.phone = this.phone[0] + this.phone[1] + this.phone[2]+ "-" + + this.phone[3] +this.phone[4] +this.phone[5] + this.phone[6] + "-" + this.phone[7] + this.phone[8] + this.phone[9]; 

    if(this.freightLoad.freightBroker.pId === this.personServ.person.pId){
      this.isUser = true;
      this.cdr.detectChanges();
    }

    let newAddress1:string = this.freightLoad.startAddress.substring(0,this.freightLoad.startAddress.length - 2);
    let newState1:string = this.freightLoad.startAddress.substring(this.freightLoad.startAddress.length, this.freightLoad.startAddress.length - 2);
    let newAddress2:string = this.freightLoad.endAddress.substring(0,this.freightLoad.endAddress.length - 2);
    let newState2:string = this.freightLoad.endAddress.substring(this.freightLoad.endAddress.length, this.freightLoad.endAddress.length - 2);
   
    // await this.map_display.loadRoute(newAddress1.trim(),newState1.trim(),newAddress2.trim(),newState2.trim());

    this.map_display.address1 = newAddress1.toString();
    this.map_display.state1 = newState1.toString();
    this.map_display.address2 = newAddress2.toString();
    this.map_display.state2 = newState2.toString();
    this.arrivalTime = this.map_display.arrivalTime;
    this.departureTime = this.map_display.departureTime;
    this.lengthInMeters = this.map_display.lengthInMeters;
    this.trafficDelayInSeconds = this.map_display.trafficDelayInSeconds;
    this.travelTimeInSeconds = this.map_display.travelTimeInSeconds;
    this.cdr.detectChanges();
  }

}
