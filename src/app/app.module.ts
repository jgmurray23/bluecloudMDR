import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatTableModule
} from '@angular/material';

import {MatSortModule} from '@angular/material';
import {MatFormField} from '@angular/material';


import {HttpClientModule} from '@angular/common/http';

import {RecipeService} from './services/recipe.service';
import {OrderServiceService} from './services/order-service.service';
import {SaveService} from './services/save.service';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import {DialogOverviewExampleDialog, OrderComponent} from './order/order.component';
import { LoginComponent } from './login/login.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import {LoginxferService} from './services/loginxfer.service';
//import { WaitingDialogComponent } from './order/waiting-dialog/waiting-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipeDisplayComponent,
    OrderComponent,
    // WaitingDialogComponent,
    DialogOverviewExampleDialog,
    LoginComponent,
    MainmenuComponent

  ],
  entryComponents: [DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [RecipeService, OrderServiceService, SaveService, LoginxferService ],

  bootstrap: [AppComponent]
})
export class AppModule { }
