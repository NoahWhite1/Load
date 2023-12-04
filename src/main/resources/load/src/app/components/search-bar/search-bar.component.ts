import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
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

  @Output("searchFor") searchFor:EventEmitter<any> = new EventEmitter();


  lowToHighText:string = "Sort From: Low to High";
  searchByText:string = "Sort By: Anything";
  searchBar:string = "";
  searchNumber:number = 0;
  isSortedFromHighToLow:boolean = false;
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
  personSignedIn:Person = new Person(0,"","","","",0,"",[],"");
  isLoadCreationToggled:boolean = false;

  constructor(private cdr:ChangeDetectorRef, private personServ:PeopleService, private freightServ:FreightLoadService) { }

  ngOnInit(): void {
    this.getPersonSignedIn();
  }
  async newLoad(formDirective:FormGroupDirective){
    console.log("executing new load function...");
    let startAddress:string = this.loadForm.get('address1').value + ", " +this.loadForm.get('city1').value + ", " + this.loadForm.get('state1').value + " " + this.loadForm.get('zipcode1').value;
    let endAddress:string = this.loadForm.get('address2').value + ", " +this.loadForm.get('city2').value + ", " + this.loadForm.get('state2').value + " " + this.loadForm.get('zipcode2').value;
    let newFreight:FreightLoad = new FreightLoad(0,this.loadForm.get('rate').value, startAddress, endAddress,
    this.loadForm.get('gasCost').value, this.loadForm.get('truckDriverPay').value,this.loadForm.get('loadCost').value, this.loadForm.get('insuranceCost').value,
    this.loadForm.get('maintenanceCost').value, this.loadForm.get('status').value, this.personSignedIn);

    await this.freightServ.createFreightLoad(newFreight, this.personSignedIn.pId);
    this.loadForm.reset();
    formDirective.resetForm();
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

  sortFromLowToHigh(){
    this.lowToHighText = "Sort From: Low to High";
    this.searchFor.emit();
    this.isSortedFromHighToLow = false;
    this.cdr.detectChanges();
    return this.isSortedFromHighToLow;
  }

  sortFromHighToLow(){
    this.lowToHighText = "Sort From: High to Low";
    this.searchFor.emit();
     this.isSortedFromHighToLow = true;
     this.cdr.detectChanges();
    return this.isSortedFromHighToLow;
  }

  searchForAnything(){
    this.searchByText = "Sort By: Anything";
    this.searchNumber = 0;
    this.searchFor.emit();
  }

  searchForRates(){
    this.searchByText = "Sort By: Rates";
    this.searchNumber = 2;
    this.searchFor.emit();
  }

  searchForStartAddresses(){
    this.searchByText = "Sort By: Start Addresses";
    this.searchNumber = 3;
    this.searchFor.emit();
  }

  searchForEndAddresses(){
    this.searchByText = "Sort By: End Addresses";
    this.searchNumber = 4;
    this.searchFor.emit();
  }

  searchByStates(){
    this.searchByText = "Sort By: States";
    this.searchNumber = 5;
    this.searchFor.emit();
  }

  searchByIds(){
    this.searchByText = "Sort By: ID's";
    this.searchNumber = 1;
    this.searchFor.emit();
  }
  searchByGasCost(){
    this.searchByText = "Sort By: Gas Cost";
    this.searchNumber = 6;
    this.searchFor.emit();
  }
  
  searchByDriverPay(){
    this.searchByText = "Sort By: Driver Pay";
    this.searchNumber = 7;
    this.searchFor.emit();
  }

  searchByLoadCost(){
    this.searchByText = "Sort By: Load Cost";
    this.searchNumber = 8;
    this.searchFor.emit();
  }

  searchByInsuranceCost(){
    this.searchByText = "Sort By: Insurance Cost";
    this.searchNumber = 9;
    this.searchFor.emit();
  }

  searchByMaintenanceCost(){
    this.searchByText = "Sort By: Maintenance Cost";
    this.searchNumber = 10;
    this.searchFor.emit();
  }
}
