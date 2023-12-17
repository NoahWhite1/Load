import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Address, PoiSearchResponse, PoiSearchResult } from '@tomtom-international/web-sdk-services';
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

  stateGroups:StateGroup [] = [
    {
      letter:'A',
      states:[
        {name:'Alabama', abbreviation:'AL'},
        {name: 'Alaska', abbreviation:'AK'},
        {name:'Arizona', abbreviation:'AZ'},
        {name: 'Arkansas', abbreviation:'AR'}
      ]
    },
    {
      letter:'C',
      states:[
        {name:'California', abbreviation:'CA'},
        {name:'Colorado', abbreviation:'CO'},
        {name:'Connecticut', abbreviation:'CT'}
      ]
    },
    {
      letter:'D',
      states:[
        {name:'Delaware', abbreviation: 'DE'}
      ]
    },
    {
      letter:'F',
      states:[
        {name:'Florida', abbreviation:'FL'}
      ]
    },
    {
      letter:'G',
      states:[
        {name:'Georgia', abbreviation:'GA'}
      ]
    },
    {
      letter:'H',
      states:[
        {name: 'Hawaii', abbreviation: 'HI'}
      ]
    },
    {
      letter:'I',
      states:[
        {name:'Idaho', abbreviation:'ID'},
        {name:'Illinois', abbreviation:'IL'},
        {name:'Indiana', abbreviation:'IN'},
        {name:'Iowa', abbreviation:'IA'}
      ]
    },
    {
      letter:'K',
      states:[
        {name:'Kansas', abbreviation:'KS'},
        {name:'Kentucky', abbreviation:'KY'}
      ]
    },
    {
      letter:'L',
      states:[
        {name:'Louisiana', abbreviation:'LA'}
      ]
    },
    {
      letter:'M',
      states:[
        {name:'Maine', abbreviation:'ME'},
        {name:'Maryland', abbreviation:'MD'},
        {name:'Massachusetts', abbreviation:'MA'},
        {name:'Michigan', abbreviation:'MI'},
        {name:'Minnesota', abbreviation:'MN'},
        {name:'Mississippi', abbreviation:'MS'},
        {name:'Missouri', abbreviation:'MO'},
        {name:'Montana', abbreviation:'MT'}
      ]
    },
    {
      letter:'N',
      states:[
        {name:'Nebraska', abbreviation:'NE'},
        {name:'Nevada', abbreviation:'NV'},
        {name:'New Hampshire', abbreviation:'NH'},
        {name:'New Jersey', abbreviation:'NJ'},
        {name:'New Mexico', abbreviation:'NM'},
        {name:'New York', abbreviation:'NY'},
        {name:'North Carolina', abbreviation:'NC'},
        {name:'North Dakota', abbreviation:'ND'},
      ]
    },
    {
      letter:'O',
      states:[
        {name:'Ohio', abbreviation:'OH'},
        {name:'Oklahoma', abbreviation:'OK'},
        {name:'Oregon', abbreviation:'OR'}
      ]
    },
    {
      letter:'P',
      states:[
        {name:'Pennsylvania', abbreviation:'PA'}
      ]
    },
    {
      letter:'R',
      states:[
        {name:'Rhode Island', abbreviation:'RI'}
      ]
    },
    {
      letter:'S',
      states:[
        {name:'South Carolina', abbreviation:'SC'},
        {name:'South Dakota', abbreviation:'SD'}
      ]
    },
    {
      letter:'T',
      states:[
        {name:'Tennessee', abbreviation:'TN'},
        {name:'Texas', abbreviation:'TX'}
      ]
    },
    {
      letter:'U',
      states:[
        {name:'Utah', abbreviation:'UT'}
      ]
    },
    {
      letter:'V',
      states:[
        {name:'Vermont', abbreviation:'VT'},
        {name:'Virginia', abbreviation:'VA'}
      ]
    },
    {
      letter:'W',
      states:[
        {name:'Washington', abbreviation:'WA'},
        {name:'West Virginia', abbreviation:'WV'},
        {name:'Wisconsin', abbreviation:'WI'},
        {name:'Wyoming', abbreviation:'WY'}
      ]
    }
  ];

  @Output("searchFor") searchFor:EventEmitter<SortingDetails> = new EventEmitter<SortingDetails>();
  searchBar:string = "";
  isSortedFromHighToLow:boolean = false;
  isLoadBeingGenerated:boolean = false;
  sortedCategoryDisplayText:string = "ID";
  startAddressList:Set<tt.Address> = new Set<tt.Address>();
  endAddressList:Set<tt.Address> = new Set<tt.Address>();
  zipcodeValidator:ValidatorFn[] = [Validators.required, Validators.pattern('[0-9]{5}')];
  validStatesPattern:string = this.initializeStatesValidator();
  stateValidator:ValidatorFn[]=[Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern("^("+ this.validStatesPattern + ")$")]
  loadForm = new FormGroup({
    address1: new FormControl(''),
    city1: new FormControl(''),
    state1: new FormControl('', this.stateValidator),
    zipcode1: new FormControl('', this.zipcodeValidator),
    address2: new FormControl(''),
    city2: new FormControl(''),
    state2: new FormControl('', this.stateValidator),
    zipcode2: new FormControl('', this.zipcodeValidator),
    loadCost: new FormControl(''),
    gasCost: new FormControl(''),
    insuranceCost: new FormControl(''),
    maintenanceCost: new FormControl(''),
    truckDriverPay: new FormControl(''),
    rate: new FormControl(''),
    status: new FormControl('')
  });


  currentStartStateGroups:StateGroup[] = [];
  currentEndStateGroups:StateGroup[] = [];
  currentStartCityGroups:Set<string> = new Set<string>();
  currentEndCityGroups:Set<string> = new Set<string>();

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

  ngOnInit():void {
    this.getPersonSignedIn();
  }

  initializeStatesValidator():string{
    let result:string = "";
    this.stateGroups.forEach((stateGroup:StateGroup)=>{
      stateGroup.states.forEach((state) => {
        return result +="|" + state.abbreviation;
      });
    });
    return result;
  }

  async updateSearchedAddresses(inputFormGroup:FormGroup,inputField:string):Promise<Set<tt.Address>>{
    if(inputFormGroup.get(inputField).value===""){
      return;
    }
    return await this.getPotentialSearchAddressesList(inputFormGroup.get(inputField).value);
  }

  async updateStartAddress()
  {
    this.startAddressList = await this.updateSearchedAddresses(this.loadForm, 'address1');
  }

  async updateEndAddress(){
    this.endAddressList = await this.updateSearchedAddresses(this.loadForm, 'address2');
  }

  selectStartAddress(inputAddress:tt.Address){
    this.organizeRouteDataToInputs(this.loadForm, inputAddress, 'address1', 'city1', 'state1', 'zipcode1');
  }

  selectEndAddress(inputAddress:tt.Address){
    this.organizeRouteDataToInputs(this.loadForm, inputAddress, 'address2', 'city2', 'state2', 'zipcode2');
  }

  async getPotentialSearchAddressesList(input:string):Promise<Set<tt.Address>>{
    let response:PoiSearchResponse = await this.freightServ.getSearchAddresses(input);
    let results:PoiSearchResult[] = response.results;
    let addressList:Set<tt.Address> = new Set<tt.Address>();
    for(let result of results){
      addressList.add(result.address);
    }
    return addressList;
  }

  organizeRouteDataToInputs(formGroup:FormGroup, inputAddress:tt.Address, address:string, city:string, state:string, zipcode:string){
    if(inputAddress === undefined){
      return;
    }
    if(inputAddress.streetNumber !== undefined){
      formGroup.get(address).setValue(inputAddress.streetNumber + " " + inputAddress.streetName);
    }
    else{
      formGroup.get(address).setValue(inputAddress.streetName);
    }
    formGroup.get(city).setValue(inputAddress.municipality);
    formGroup.get(state).setValue(inputAddress.countrySubdivision);
    formGroup.get(zipcode).setValue(inputAddress.postalCode);
  }

  filterStates(value: string):StateGroup[]{
    let stateGroup:StateGroup[] = [];
    if (value) {
      stateGroup = this.stateGroups.map(group=>({letter:group.letter, states:filterState(group.states, value)}))
      .filter(group => group.states.length > 0);
      return stateGroup;
    }
    console.log(stateGroup);
  }

  filterCities(value:string, addressList:Set<tt.Address>):string[]{
  if(value === undefined || value===' '){
    return;
  }
  let valueArray:string[] = [];
  for(let address of addressList){
    valueArray.push(address.municipality);
  }
  let newValueArray:string[] = [];
  newValueArray = filterText(valueArray, value);
  return newValueArray;
  // if(value){
  //   valueArray = this.startAddressList.forEach((address:tt.Address)=>{return filterCity(address.municipality, value)})
  //   }
  //   return valueArray;
  }

  filterStartCity(){
    let value:string = this.loadForm.get('city1').value;
    this.currentStartCityGroups = new Set<string>();
    this.filterCities(value, this.startAddressList).map((value:string)=>{this.currentStartCityGroups.add(value)});
  }

  filterEndCity(){
    let value:string = this.loadForm.get('city2').value;
    this.currentEndCityGroups = new Set<string>();
    this.filterCities(value, this.endAddressList).map((value:string)=>{this.currentEndCityGroups.add(value)})
  }

  filterStartState(){
    let value:string = this.loadForm.get('state1').value;
    this.currentStartStateGroups = this.filterStates(value);
  }

  filterEndState(){
    let value:string = this.loadForm.get('state2').value;
    this.currentEndStateGroups = this.filterStates(value);
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

export interface StateGroup{
  letter:string;
  states:State[];
}

export interface State{
  name:string;
  abbreviation:string;
}

export const filterText = (opt: string[], value: string): string[] =>{
  let filterValue:string = value.toLowerCase();
  opt = opt.filter(value=>value);
  return opt.filter((item:string)=> item.toLowerCase().includes(filterValue));
};

export const filterState = (opt: State[], value: string): State[] => {
  let filterValue:string = value.toLowerCase();
  return opt.filter((item:State) => item.name.toLowerCase().includes(filterValue));
};