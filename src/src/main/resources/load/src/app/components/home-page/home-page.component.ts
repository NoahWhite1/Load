import { preserveWhitespacesDefault } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FreightLoad } from 'src/app/modules/freight-load/freight-load.module';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Person } from 'src/app/modules/person/person.module';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements AfterViewInit {

  freightLoads:Array<FreightLoad> = [];
  freightPosted:Array<FreightLoad> = [];
  freightInProgress:Array<FreightLoad> = [];
  freightDelivered:Array<FreightLoad> = [];
  freightFailed:Array<FreightLoad> = [];
  FrieghtLoad:FreightLoad = new FreightLoad(0, 0, "", "", 0, 0, 0, 0, 0, 0, null);
  isBroker:boolean = false;
  isTrucker:boolean = false;
  isSignedIn:boolean = false;
  @ViewChild(SearchBarComponent)
  searchBar:SearchBarComponent;
  searchByText:string = "";
  isLowToHigh:boolean = false;
  personSignedIn:Person = new Person(0, " ", " ", " ", " ", 0, " ", [], " ");
  constructor(private freightServ:FreightLoadService, private peopleServ:PeopleService, private cdr:ChangeDetectorRef) { }

  async ngAfterViewInit(){

    this.getPersonSignedIn();
    if(this.personSignedIn.pId != 0 && !undefined && !null){
      this.isSignedIn = true;
    }
    else{
      this.isSignedIn = false;
    }

    if(this.peopleServ.person === null){
      return;
    }

    await this.getAllFreight();

    
    if(this.peopleServ.person.aLevel === 0){
      this.isTrucker = true;
    }
    else if(this.peopleServ.person.aLevel > 0){
      this.isBroker = true;
    }
  }

  async getPersonSignedIn(){
    this.personSignedIn = await this.peopleServ.findPersonById(parseInt(sessionStorage.getItem("pId")));
  }

  async getAllFreight():Promise<void>{
    this.freightLoads = await this.freightServ.getAllFreightLoads();

    let tempFreights:Array<any> = [];
    this.freightPosted = [];
    this.freightInProgress = [];
    this.freightDelivered = [];
    this.freightFailed = [];

    if(this.peopleServ.person === null){
      this.freightLoads = [];
      return;
    }

    if(this.peopleServ.person.aLevel === 0){
        for(let freight of this.freightLoads){
          if(freight.status === 0){
            tempFreights.push(freight);
          }
        }
        this.freightLoads = tempFreights;
    }


    await this.findUserLoads();

    if(this.peopleServ.person.aLevel > 0){
      for(let freight of this.freightLoads){
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
    const allFreight:Array<FreightLoad> = await this.freightServ.getAllFreightLoads();
    this.freightLoads = allFreight;
    this.isLowToHigh = this.searchBar.isSortedFromHighToLow;
    await this.SortLoadsBy();
  }


  searchBy(freightList:Array<FreightLoad>){
    this.searchByText = this.searchBar.searchBar;
    let allFreight:Array<FreightLoad> = [];
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
