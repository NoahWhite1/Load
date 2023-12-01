import { Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people-service/people.service';
import { LoginDisplayComponent } from '../login-display/login-display.component';
import { SignOutComponent } from '../sign-out/sign-out.component';
import { Person } from 'src/app/modules/person/person.module';


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
  options: FormGroup;
  personSignedIn:Person = new Person(0, " ", " ", " ", " ", 0, " ", [], " ");


  constructor(fb: FormBuilder, private route:Router, private peopleServ:PeopleService) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit(): void {
  this.getBreederSignedIn();

    if(this.peopleServ.person === null){
      return;
    }
  }

  
  async getBreederSignedIn(){
    this.personSignedIn = await this.peopleServ.findPersonById(parseInt(localStorage.getItem('pId')));
    console.log(this.personSignedIn);
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
}
