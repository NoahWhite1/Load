import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { FreightLoad } from 'src/app/modules/freight-load/freight-load.module';
import { Person } from 'src/app/modules/person/person.module';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  @Output("searchFor") searchFor:EventEmitter<SortingDetails> = new EventEmitter<SortingDetails>();
  searchBar:string = "";
  isSortedFromHighToLow:boolean = false;
  isLoadBeingGenerated:boolean = false;
  sortedCategoryDisplayText:string = "ID";
  loadForm = new FormGroup({
    address1: new FormControl(''),
    city1: new FormControl(''),
    state1: new FormControl(''),
    zipcode1: new FormControl(''),
    address2: new FormControl(''),
    city2: new FormControl(''),
    state2: new FormControl(''),
    zipcode2: new FormControl(''),
    loadCost: new FormControl(''),
    gasCost: new FormControl(''),
    insuranceCost: new FormControl(''),
    maintenanceCost: new FormControl(''),
    truckDriverPay: new FormControl(''),
    rate: new FormControl(''),
    status: new FormControl('')
  });
  readonly searchByFieldOptionsArray:Array<{id:number, value:string, iconValue:string}> = [
    {id:0, value:'I.D.', iconValue:"rule_folder"},
    {id:1, value:"Rate", iconValue:"savings"},
    {id:2, value:"Start Address", iconValue:"flag"},
    {id:3, value:"End Address", iconValue:"mode_standby"},
    {id:4, value:"Gas Cost", iconValue:"local_gas_station"},
    {id:5, value:"Driver Pay", iconValue:"request_quote"},
    {id:6, value:"Load Cost", iconValue:"local_shipping"},
    {id:7, value:"Insurance Cost", iconValue:"payments"},
    {id:8, value:"Maintenace Cost", iconValue:"handyman"}
  ];

  searchOptionsForm = new FormGroup({
    sortByField: new FormControl('0'),
    sortDirection: new FormControl('0'),
    searchInput: new FormControl('')
  })
  
  personSignedIn:Person = new Person(0,"","","","",0,"",[],"");
  isLoadCreationToggled:boolean = false;

  constructor(private personServ:PeopleService, private freightServ:FreightLoadService) { }

  ngOnInit(): void {
    this.getPersonSignedIn();
  }

  async newLoad(formDirective:FormGroupDirective){
    this.isLoadBeingGenerated = true;
    console.log("executing new load function...");
    let startAddress:string = this.loadForm.get('address1').value + ", " +this.loadForm.get('city1').value + ", " + this.loadForm.get('state1').value + " " + this.loadForm.get('zipcode1').value;
    let endAddress:string = this.loadForm.get('address2').value + ", " +this.loadForm.get('city2').value + ", " + this.loadForm.get('state2').value + " " + this.loadForm.get('zipcode2').value;
    let newFreight:FreightLoad = new FreightLoad(0,this.loadForm.get('rate').value, startAddress, endAddress,
    this.loadForm.get('gasCost').value, this.loadForm.get('truckDriverPay').value,this.loadForm.get('loadCost').value, this.loadForm.get('insuranceCost').value,
    this.loadForm.get('maintenanceCost').value, this.loadForm.get('status').value, this.personSignedIn);
    await this.freightServ.createFreightLoad(newFreight, this.personSignedIn.pId);
    this.loadForm.reset();
    formDirective.resetForm();
    this.isLoadBeingGenerated = false;
    // this.categorySelector = "id";
  }

  openLoadCreation(){
    this.isLoadCreationToggled = true;
  }

  closeLoadCreation(){
    this.isLoadCreationToggled = false;
  }

  async getPersonSignedIn(){
    this.personSignedIn = await this.personServ.findPersonById(parseInt(localStorage.getItem("pId")));
  }

  isInputValid(formField:FormControl){
    console.log('function ran');
    if(formField.invalid){
      console.log('logging invalid field' + formField);
      // let errorMsg:string = formField. 'fd formField.value'        
    }
    else
    {

    }
  }
  searching(){
    this.searchFor.emit();
  }

  toggleSortDirection(selectedValue:number)
  {
    switch(selectedValue){
      case 0:
        this.isSortedFromHighToLow = false;
        break;
      case 1:
        this.isSortedFromHighToLow = true;
        break;
    }
    console.log("calling function to sort");
    this.sortByCategoryIdAndSortDirection(parseInt(this.searchOptionsForm.get('sortByField').value), this.isSortedFromHighToLow);
  }

  sortByCategoryIdAndSortDirection(selectedCategoryId:number, isSortedFromHighToLow:boolean)
  {
    let sortingDetails:SortingDetails = 
    {
      category:selectedCategoryId, 
      isSortingHighToLow:isSortedFromHighToLow
    };
    console.log("Creating category");
    console.log("category value set: " + sortingDetails.category + " bool value: " + this.isSortedFromHighToLow);
    this.searchFor.emit(sortingDetails);
  }
}

export interface SortingDetails{
  category:number;
  isSortingHighToLow:boolean;
}
