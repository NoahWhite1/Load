import { Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Person } from 'src/app/modules/person/person.module';
import { PeopleService } from 'src/app/services/people-service/people.service';

@Component({
  selector: 'app-login-display',
  templateUrl: './login-display.component.html',
  styleUrls: ['./login-display.component.css']
})

@Injectable()
export class LoginDisplayComponent implements OnInit {
  @Output ("toggleLoginIcon") toggleLoginIcon: EventEmitter<any> = new EventEmitter;
  loginDisplay:boolean = false;
  hide:boolean = true;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })
  person:Person = new Person(0, " ", " ", " ", " ", 0, " ", [], " ");
  isLoggedIn:boolean = false;

  constructor(private peopleServ:PeopleService,private route:Router, private snackbar:MatSnackBar) {
   }

  ngOnInit(): void {
  }

  async login(){
    this.person = await this.peopleServ.loginCredentials(this.loginForm.get('username').value,this.loginForm.get('password').value);
    
    if(this.person != null){
      this.isLoggedIn = true;
      localStorage.setItem("pId", this.person.pId.toString());
      this.toggleLoginIcon.emit();

      if(this.person.aLevel === 0){
        this.route.navigate(["/**"]);
      }
      else{
        console.log("Level " + this.person.aLevel);
        this.route.navigate(["/my_freight_loads"]);
      }

      this.displayLogin();
    }
    else{
      this.loginForm.get('password').setValue("");
      this.IncorrectUsernameOrPasswordSnackBar();
    }
  }

  displayLogin(){
    this.loginDisplay = !this.loginDisplay;
  }

  public get getLoginDisplay():boolean{
    return this.loginDisplay;
  }
  
  IncorrectUsernameOrPasswordSnackBar() {
    this.snackbar.open("Incorrect username or password", "close", {
      duration: 4000,
    });
  }
  
  get getIsloggedIn(){
    return this.isLoggedIn;
  }
}
