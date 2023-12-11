import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapDisplayComponent } from './components/map-display/map-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import {BannerComponent} from 'src/app/components/banner/banner.component';
import { LoginDisplayComponent } from 'src/app/components/login-display/login-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { PeopleService } from './services/people-service/people.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FreightLoadService } from './services/freight-load-service/freight-load.service';
import {MatMenuModule} from '@angular/material/menu';
import { FreightLoadTableComponent } from './components/freight-load-table/freight-load-table.component';
import {MatCardModule} from '@angular/material/card';
import { FreightLoadsDisplayComponent } from './components/freight-loads-display/freight-loads-display.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { MoneyPipe } from './pipes/money-pipe/money.pipe';
import { FreightIndividualDisplayComponent } from './components/freight-individual-display/freight-individual-display.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MapDisplayComponent,
    HomePageComponent,
    BannerComponent,
    LoginDisplayComponent,
    FreightLoadTableComponent,
    FreightLoadsDisplayComponent,
    SignOutComponent,
    MoneyPipe,
    FreightIndividualDisplayComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressSpinnerModule

  ],
  providers: [PeopleService, FreightLoadService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
