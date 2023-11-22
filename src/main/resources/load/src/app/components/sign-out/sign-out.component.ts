import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people-service/people.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  @Output ("toggleSignoutIcon") toggleSignout: EventEmitter<any> = new EventEmitter;
  isSignoutDisplayed:boolean = false;

  constructor(private peopleServ:PeopleService, private route:Router) { }

  ngOnInit(): void {
  }

  toggleSignoutIcon(){
    this.isSignoutDisplayed = !this.isSignoutDisplayed;
  }

  logout(){
    this.peopleServ.isSignedIn = false;
    this.peopleServ.person = null;
    this.toggleSignout.emit();
    
    if(this.route.onSameUrlNavigation){
      this.route.navigate(["/**"]);
    }
    else{
      this.route.navigate(["/home"]);
    }
  }

}
