import { preserveWhitespacesDefault } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FreightLoad } from 'src/app/modules/freight-load/freight-load.module';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Person } from 'src/app/modules/person/person.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {

  freightLoads:FreightLoad[] = [];
  freightPosted:Array<FreightLoad> = [];
  freightInProgress:Array<FreightLoad> = [];
  freightDelivered:Array<FreightLoad> = [];
  freightFailed:Array<FreightLoad> = [];
  FrieghtLoad:FreightLoad = new FreightLoad(0, 0, "", "", 0, 0, 0, 0, 0, 0, null);
  isSignedIn:boolean = false;
  @ViewChild(SearchBarComponent)
  searchBar:SearchBarComponent;
  searchByText:string = "";
  isLowToHigh:boolean = false;
  personSignedIn:Person = new Person(0, " ", " ", " ", " ", 0, " ", [], " ");
  constructor(private freightServ:FreightLoadService, private peopleServ:PeopleService, private route:Router) { }

  async ngOnInit(){

    this.personSignedIn = await this.getPersonSignedIn();
    if(this.personSignedIn != undefined && this.personSignedIn != null){
      console.log("Freight: " + this.freightLoads);
    }
    else{
      
    }
  }

  async getPersonSignedIn():Promise<Person>{
    return this.personSignedIn = await this.peopleServ.findPersonById(parseInt(sessionStorage.getItem("pId")));
  }
}
