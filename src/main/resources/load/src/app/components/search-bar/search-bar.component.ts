import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';

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

  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
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
