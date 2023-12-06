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
  searchBar:string = "";
  searchNumber:number = 0;
  isSortedFromHighToLow:boolean = false;
  isLoadBeingGenerated:boolean = false;
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
    this.searchFor.emit();
    this.isSortedFromHighToLow = false;
    return this.isSortedFromHighToLow;
  }

  sortFromHighToLow(){
    this.searchFor.emit();
     this.isSortedFromHighToLow = true;
    return this.isSortedFromHighToLow;
  }

  searchByIds(){
    this.searchNumber = 0;
    this.searchFor.emit();
  }

  searchForRates(){
    this.searchNumber = 1;
    this.searchFor.emit();
  }

  searchForStartAddresses(){
    this.searchNumber = 2;
    this.searchFor.emit();
  }

  searchForEndAddresses(){
    this.searchNumber = 3;
    this.searchFor.emit();
  }

  searchByGasCost(){
    this.searchNumber = 4;
    this.searchFor.emit();
  }
  
  searchByDriverPay(){
    this.searchNumber = 5;
    this.searchFor.emit();
  }

  searchByLoadCost(){
    this.searchNumber = 6;
    this.searchFor.emit();
  }

  searchByInsuranceCost(){
    this.searchNumber = 7;
    this.searchFor.emit();
  }

  searchByMaintenanceCost(){
    this.searchNumber = 8;
    this.searchFor.emit();
  }
}
