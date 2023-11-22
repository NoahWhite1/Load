import { Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { LoginDisplayComponent } from '../login-display/login-display.component';
import { SignOutComponent } from '../sign-out/sign-out.component';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent {

  @ViewChild(LoginDisplayComponent)
  logindisplay:LoginDisplayComponent;
  displayProfile:boolean = false;
  @ViewChild(SignOutComponent)
  signOutDisplay:SignOutComponent;
  username:string = "";
  password:string = "";
  isLoggedIn:boolean = false;
  options: FormGroup;
  isTrucker:boolean = false;

  constructor(fb: FormBuilder, private route:Router, private peopleServ:PeopleService) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.peopleServ.isSignedIn;

    if(this.peopleServ.person === null){
      return;
    }
    else if(this.peopleServ.person.aLevel === 0){
      this.isTrucker = true;
    }
  }

  async loginDisplay(){
    this.logindisplay.displayLogin();
  }

  signoutDisplay(){
    this.signOutDisplay.toggleSignoutIcon();
  }

  loadCalculator(){
    this.route.navigate(['/my_freight_loads']);
  }

  homePage(){
    if(this.route.onSameUrlNavigation.includes("home")){
      console.log(this.route.onSameUrlNavigation.includes("home"));
      this.route.navigate(["/**"]);
    }
    else{
      this.route.navigate(["/home"]);
    }
  }

   toggleIsLoggedIn(){
    this.isLoggedIn = !this.isLoggedIn;
    this.peopleServ.isSignedIn = this.isLoggedIn;
  }
}
