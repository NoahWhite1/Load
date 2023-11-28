import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from "src/app/modules/person/person.module";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  
  url:string = `http://localhost:8080`;
  isSignedIn:boolean = false;
  person:Person = new Person(0, " ", " ", " ", " ", 0, " ", [], " ");

  constructor(private http:HttpClient) { 
  }

  async loginCredentials(username:string,password:string):Promise<Person>{
    const person:Person = await this.http.get<Person>(this.url + `/persons?username=${username}&password=${password}`).toPromise();
    this.person = person;
    return person;
  }

  async createPerson(newPerson:Person):Promise<Person>{
    const person:Person = await this.http.post<Person>(this.url + `/persons`,newPerson).toPromise();
    return person;
  }

  async findPersonByUsername(username:string):Promise<Person>{
    const person:Person = await this.http.get<Person>(this.url + `/persons/${username}`).toPromise();
    return person;
  }

  async findPersonById(id:number):Promise<Person>{
    const person:Person = await this.http.get<Person>(this.url +`/persons/${id}`).toPromise();
    return person;
  }
}
