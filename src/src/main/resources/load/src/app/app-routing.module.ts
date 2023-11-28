import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreightIndividualDisplayComponent } from './components/freight-individual-display/freight-individual-display.component';
import { FreightLoadsDisplayComponent } from './components/freight-loads-display/freight-loads-display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MapDisplayComponent } from './components/map-display/map-display.component';

const routes: Routes = [
   {path : "my_freight_loads", component: FreightLoadsDisplayComponent},
   {path : "freight_load", component: FreightIndividualDisplayComponent},
   {path : "home", component : HomePageComponent},
   {path : "**", component : HomePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
