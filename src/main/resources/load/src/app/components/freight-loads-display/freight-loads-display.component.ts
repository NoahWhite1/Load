import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FreightLoad } from 'src/app/modules/freight-load/freight-load.module';
import { Person } from 'src/app/modules/person/person.module';

@Component({
  selector: 'app-freight-loads-display',
  templateUrl: './freight-loads-display.component.html',
  styleUrls: ['./freight-loads-display.component.css']
})
export class FreightLoadsDisplayComponent implements OnInit {

  @ViewChild(SearchBarComponent)
  searchBar:SearchBarComponent;
  freightLoads:Array<FreightLoad> = [];
  freightSort:number = 0;
  isLowToHigh:boolean = false;
  searchByText:string = "";
  freightPosted:Array<FreightLoad> = [];
  freightInProgress:Array<FreightLoad> = [];
  freightDelivered:Array<FreightLoad> = [];
  freightFailed:Array<FreightLoad> = [];
  personSignedIn:Person = new Person(0, " ", " ", " ", " ", 0, " ", [], " ");

  constructor(private PersonServ:PeopleService, private freightServ:FreightLoadService, private cdr:ChangeDetectorRef) { }

  ngOnInit() {

    this.getPersonSignedIn();
    if(this.personSignedIn != null || undefined){
      console.log("Finding loads now");
      this.findUserLoads();
    }
  }

  async getPersonSignedIn(){
    this.personSignedIn = await this.PersonServ.findPersonById(parseInt(localStorage.getItem("pId")));
  }

  async findUserLoads(){
    this.freightLoads = [];
    let allFreight:Array<FreightLoad> = await this.freightServ.getAllFreightLoads();

    for(let f of allFreight){
      this.freightLoads.push(f);
      switch(f.status){
        case 0:
          this.freightPosted.push(f);
          break;
        case 1:
          this.freightInProgress.push(f);
          break;
        case 2:
          this.freightDelivered.push(f);
          break;
        case 3:
          this.freightFailed.push(f);
          break;
      }
    }
    this.isLowToHigh = this.searchBar.isSortedFromHighToLow;
    await this.SortLoadsBy();
  }


  searchBy(freightList:Array<FreightLoad>){
    this.searchByText = this.searchBar.searchBar;
    let allFreight:Array<FreightLoad> = [];
    for(let l of freightList){
      l.freightBroker.pId == null;
      if(JSON.stringify(l.f_id).includes(this.searchByText) || JSON.stringify(l.f_id).includes(this.searchByText) || l.startAddress.includes(this.searchByText) || l.endAddress.includes(this.searchByText) || JSON.stringify(l.gasCost).includes(this.searchByText) || JSON.stringify(l.driverPay).includes(this.searchByText) || JSON.stringify(l.loadCost).includes(this.searchByText) || JSON.stringify(l.insuranceCost).includes(this.searchByText) || JSON.stringify(l.maintenanceCost).includes(this.searchByText) || l.freightBroker.firstName.includes(this.searchByText) || l.freightBroker.lastName.includes(this.searchByText)){
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
    let freightList:Array<FreightLoad> = this.freightLoads;

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
