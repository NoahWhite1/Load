import { Component, OnInit,Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FreightLoad } from 'src/app/modules/freight-load/freight-load.module';
import { Person } from 'src/app/modules/person/person.module';
import { FreightLoadService } from 'src/app/services/freight-load-service/freight-load.service';
import { PeopleService } from 'src/app/services/people-service/people.service';

@Component({
  selector: 'app-freight-load-table',
  templateUrl: './freight-load-table.component.html',
  styleUrls: ['./freight-load-table.component.css']
})
export class FreightLoadTableComponent implements OnInit {

  @Input("freightLoad") freightLoad:FreightLoad;
  person:Person;
  freightColor:string = " ";

  constructor(private personServ:PeopleService, private route:Router, private freightServ:FreightLoadService, private el:ElementRef) { }

  ngOnInit(): void {
    this.person = this.personServ.person;

    switch(this.freightLoad.status){
      case 0: // freight posted to board
        this.freightColor = "linear-gradient(#2eaec5,black)";
        break;
      case 1:// freight delivery in progress
        this.freightColor = "linear-gradient(#999900,black)";
        break;
      case 2:// freight delivered
        this.freightColor = "linear-gradient(green,black)";
        break;
      case 3:// freight not delivered
          this.freightColor = "linear-gradient(#8b0000,black)";
        break;
    }
  }

  selectFreight(){
    localStorage.setItem("lId", this.freightLoad.f_id.toString());
    this.route.navigate(["/freight_load"]);
  }

}
