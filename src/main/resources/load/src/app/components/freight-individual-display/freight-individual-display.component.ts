import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { MapDisplayComponent } from '../map-display/map-display.component';
import { FreightLoad } from 'src/app/modules/freight-load/freight-load.module';
import { Person } from 'src/app/modules/person/person.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freight-individual-display',
  templateUrl: './freight-individual-display.component.html',
  styleUrls: ['./freight-individual-display.component.css']
})
export class FreightIndividualDisplayComponent implements AfterViewInit {
  
  person:Person = new Person(0, " ", " ", " ", " ", 0, " ", [], "")
  freightLoad:FreightLoad = new FreightLoad(0, 0, "", "", 0, 0, 0, 0, 0, 0, this.person);
  @ViewChild(MapDisplayComponent)
  map_display:MapDisplayComponent;
  @Input() arrivalTime:Date;
  @Input() departureTime:Date;
  @Input() lengthInMeters:number = 0;
  @Input() trafficDelayInSeconds:number = 0;
  @Input() travelTimeInSeconds:number = 0;
  isUser:boolean = false;
  phone:string = " ";
  personSignedIn:Person = new Person(0, " ", " ", " "," ", 0, " ", []," ")
  constructor(private freightServ:FreightLoadService, private personServ:PeopleService, private route:Router) { }

  async ngAfterViewInit(){
    await this.getPersonSignedIn();
    await this.getLoadById();
    await this.map_display.loadRoute(this.freightLoad.startAddress, this.freightLoad.endAddress);    
  }
  async getLoadById(){
    this.freightLoad = await this.freightServ.getFreightLoadById(parseInt(localStorage.getItem("lId")));
    this.formatPhoneNumber();
  }

  async getPersonSignedIn(){
    this.personSignedIn = await this.personServ.findPersonById(parseInt(localStorage.getItem("pId")));
  }

  formatPhoneNumber(){
    this.phone = this.freightLoad.freightBroker.phone;

    this.phone = this.phone[0] + this.phone[1] + this.phone[2] + "-" + this.phone[3] + this.phone[4] + this.phone[5] +
    "-" + this.phone[6] + this.phone[7] + this.phone[8] + this.phone[9]; 
  }

  returnToLoadBoard(){
    this.route.navigate(['my_freight_loads']);
  }
}
