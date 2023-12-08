import { Component, ViewChild, ViewEncapsulation, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { SearchBarComponent, SortingDetails } from '../search-bar/search-bar.component';
import { FreightLoad } from 'src/app/modules/freight-load/freight-load.module';
import { Person } from 'src/app/modules/person/person.module';
import { Input } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-freight-loads-display',
  templateUrl: './freight-loads-display.component.html',
  styleUrls: ['./freight-loads-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FreightLoadsDisplayComponent implements AfterViewInit {

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
  @ViewChild("loadStatusBoard")
  loadStatusBoard: MatTabGroup;
  @ViewChild("focusedTab")
  tabToFocus:ElementRef;
  inkBar:Element;
  @Input()
  selectedTab:number = 0;

  constructor(private PersonServ:PeopleService, private freightServ:FreightLoadService, private renderer:Renderer2, private element:ElementRef) { }

  ngAfterViewInit() {
    this.getPersonSignedIn();
    if(this.personSignedIn != null || undefined){
      console.log("Finding loads now");
      this.findUserLoads();
    }
    this.setTabFocus();
    this.hideOverflow();
  }

  setTabFocus(){
    this.onSelectedIndexChange(0);
  }

  hideOverflow(){
    this.renderer.setStyle(document.body,'overflow', 'hidden');
  }

  setInkBar(){
    let results:HTMLCollection = document.getElementsByClassName('mat-ink-bar');
    this.inkBar = results[0];
  }

  colorInkBar(tabSelected:number){
    switch(tabSelected){
      case 0:
        this.renderer.setStyle(this.inkBar, 'background-color', 'white');
        break;
      case 1:
        this.renderer.setStyle(this.inkBar, 'background-color', 'blue');
        break;
      case 2:
        this.renderer.setStyle(this.inkBar, 'background-color', 'yellow');
        break;
      case 3:
        this.renderer.setStyle(this.inkBar, 'background-color', 'green');
        break;
      case 4:
        this.renderer.setStyle(this.inkBar, 'background-color', 'red');
        break;
    }
  }

  onSelectedIndexChange(currentIndex:number){
    if(this.inkBar == null || this.inkBar == undefined){
      this.setInkBar();
    }
    this.selectedTab = currentIndex;
    this.colorInkBar(this.selectedTab)
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

  async sortLoadsBy(obj:SortingDetails){
    let freightList:Array<FreightLoad> = this.freightLoads;
    console.log("obj: " + obj);
    console.log("value selected> " + this.searchBar.searchOptionsForm.get('sortByField').value);
    switch(obj.category){
      case 0: //ID
        if(obj.isSortingHighToLow){
          freightList.sort((a,b) => (a.f_id < b.f_id)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.f_id > b.f_id)? 1:-1);
        }
        break;
      case 1: //Rate
        if(obj.isSortingHighToLow){
          freightList.sort((a,b) => (a.rate < b.rate)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.rate > b.rate)? 1:-1);
        }
        break;  
      case 2: //Start Address
        if(obj.isSortingHighToLow){
          freightList.sort((a,b) => (a.startAddress < b.startAddress)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.startAddress > b.startAddress)? 1:-1);
        }
      break;
      case 3: //End Address
        if(obj.isSortingHighToLow){
          freightList.sort((a,b) => (a.endAddress < b.endAddress)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.endAddress > b.endAddress)? 1:-1);
        }
        break;
      case 4: //Gas Cost
        if(obj.isSortingHighToLow){
          freightList.sort((a,b) => (a.gasCost < b.gasCost)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.gasCost > b.gasCost)? 1:-1);
        }
        break;
      case 5: //Driver Pay
        if(obj.isSortingHighToLow){
          freightList.sort((a,b) => (a.driverPay < b.driverPay)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.driverPay > b.driverPay)? 1:-1);
        }
        break;
      case 6: //Load Cost
        if(obj.isSortingHighToLow){
          freightList.sort((a,b) => (a.loadCost < b.loadCost)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.loadCost > b.loadCost)? 1:-1);
        }
        break;
      case 7: //Insurance Cost
        if(obj.isSortingHighToLow){
          freightList.sort((a,b) => (a.insuranceCost < b.insuranceCost)? 1:-1);
        }
        else{
          freightList.sort((a,b) => (a.insuranceCost > b.insuranceCost)? 1:-1);
        }
        break;
      case 8: //Maintenance Cost
        if(obj.isSortingHighToLow){
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
