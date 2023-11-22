import { Person } from "../person/person.module";

export class FreightLoad {

  fl_id:number;
  fl_rate:number;
  fl_start_pos:string;
  fl_end_pos:string;
  fl_gas_cost:number;
  fl_trucker_cost:number;
  fl_load_cost:number;
  fl_insurance_cost:number;
  fl_maintenance_cost:number;
  fl_person:Person;
  fl_status:number;

  constructor(fl_id:number,fl_rate:number,fl_start_pos:string, fl_end_pos:string, fl_gas_cost:number, fl_trucker_cost:number,fl_load_cost:number,fl_insurance_cost:number, fl_person:Person, fl_status:number){
    this.fl_id = fl_id;
    this.fl_rate = fl_rate;
    this.fl_start_pos = fl_start_pos;
    this.fl_end_pos = fl_end_pos;
    this.fl_gas_cost = fl_gas_cost;
    this.fl_trucker_cost = fl_trucker_cost;
    this.fl_load_cost = fl_load_cost;
    this.fl_insurance_cost = fl_insurance_cost;
    this.fl_maintenance_cost;
    this.fl_person = fl_person;
    this.fl_status = fl_status;
  }

 }
