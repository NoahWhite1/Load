import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-freight-loads-display',
  templateUrl: './freight-loads-display.component.html',
  styleUrls: ['./freight-loads-display.component.css']
})
export class FreightLoadsDisplayComponent implements OnInit {

  @ViewChild(SearchBarComponent)
  searchBar:SearchBarComponent;
  freightLoads:Array<any> = [];
  freightSort:number = 0;
  isLowToHigh:boolean = false;
  searchByText:string = "";
  freightPosted:Array<any> = [];
  freightInProgress:Array<any> = [];
  freightDelivered:Array<any> = [];
  freightFailed:Array<any> = [];

  constructor(private PersonServ:PeopleService, private freightServ:FreightLoadService, private cdr:ChangeDetectorRef) { }

  async ngOnInit() {

    let tempFreights:Array<any> = [];
    this.freightPosted = [];
    this.freightInProgress = [];
    this.freightDelivered = [];
    this.freightFailed = [];

    await this.findUserLoads();

    if(this.PersonServ.person.pId > 0){
      for(let freight of this.freightLoads){
        if(freight.freightBroker.pId !== this.PersonServ.person.pId){
          return;
        }
        switch(freight.status){
          case 0:
            this.freightPosted.push(freight);
            break;
          case 1:
            this.freightInProgress.push(freight);
            break;
          case 2:
            this.freightDelivered.push(freight);
            break;
          case 3:
            this.freightFailed.push(freight);
            break;
        }
      }
      this.cdr.detectChanges();
    }
  }

  async findUserLoads(){
    const allFreight:Array<any> = await this.freightServ.getAllFreightLoads();
    this.freightLoads = [];
    for(let f of allFreight){
      if(f.freightBroker.pId === this.PersonServ.person.pId)
      this.freightLoads.push(f);
    }
    this.isLowToHigh = this.searchBar.isSortedFromHighToLow;
    await this.SortLoadsBy();
  }


  searchBy(freightList:Array<any>){
    this.searchByText = this.searchBar.searchBar;
    let allFreight:Array<any> = [];
    for(let l of freightList){
      l.freightBroker.pId == null;
      if(JSON.stringify(l.f_id).includes(this.searchByText) || JSON.stringify(l.rate).includes(this.searchByText) || l.startAddress.includes(this.searchByText) || l.endAddress.includes(this.searchByText) || JSON.stringify(l.gasCost).includes(this.searchByText) || JSON.stringify(l.driverPay).includes(this.searchByText) || JSON.stringify(l.loadCost).includes(this.searchByText) || JSON.stringify(l.insuranceCost).includes(this.searchByText) || JSON.stringify(l.maintenanceCost).includes(this.searchByText) || l.freightBroker.firstName.includes(this.searchByText) || l.freightBroker.lastName.includes(this.searchByText)){
        allFreight.push(l);
      }
    }
    this.freightLoads = allFreight;
  }

  sortFromLowToHigh(){
      this.isLowToHigh = this.searchBar.sortFromLowToHigh();
  }

  sortFromHighToLow(){
    this.isLowToHigh = this.searchBar.sortFromHighToLow();
  }

  async SortLoadsBy(){
    let freightList:Array<any> = this.freightLoads;

    switch(this.searchBar.searchNumber){
      
      case 0: //Any
        break;

      case 1: //ID
        if(this.isLowToHigh){
          freightList.sort((a,b) => (a.f_id < b.f_id)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.f_id > b.f_id)? 1:-1);
        }
        break;

      case 2: //Rate
        if(this.isLowToHigh){
          freightList.sort((a,b) => (a.rate < b.rate)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.rate > b.rate)? 1:-1);
        }
        break;  
      
      case 3: //Start Address
        if(this.isLowToHigh){
          freightList.sort((a,b) => (a.startAddress < b.startAddress)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.startAddress > b.startAddress)? 1:-1);
        }
      break;
      
      case 4: //End Address
        if(this.isLowToHigh){
          freightList.sort((a,b) => (a.endAddress < b.endAddress)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.endAddress > b.endAddress)? 1:-1);
        }
        break;
      
      case 6: //Gas Cost
        if(this.isLowToHigh){
          freightList.sort((a,b) => (a.gasCost < b.gasCost)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.gasCost > b.gasCost)? 1:-1);
        }
        break;
      
      case 7: //Driver Pay
        if(this.isLowToHigh){
          freightList.sort((a,b) => (a.driverPay < b.driverPay)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.driverPay > b.driverPay)? 1:-1);
        }
        break;

      case 8: //Load Cost
        if(this.isLowToHigh){
          freightList.sort((a,b) => (a.loadCost < b.loadCost)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.loadCost > b.loadCost)? 1:-1);
        }
        break;

      case 9: //Insurance Cost
        if(this.isLowToHigh){
          freightList.sort((a,b) => (a.insuranceCost < b.insuranceCost)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.insuranceCost > b.insuranceCost)? 1:-1);
        }
        break;
        
      case 10: //Maintenance Cost
        if(this.isLowToHigh){
          freightList.sort((a,b) => (a.maintenanceCost < b.maintenanceCost)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.maintenanceCost > b.maintenanceCost)? 1:-1);
        }
      break;

      default:
        break;
    }
    this.searchBy(freightList);
  }
}
