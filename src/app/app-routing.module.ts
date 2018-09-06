import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RecipeDisplayComponent} from './recipe-display/recipe-display.component';
import {OrderComponent} from './order/order.component';
import {MainmenuComponent} from './mainmenu/mainmenu.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: 'recipe', component: RecipeDisplayComponent },
  { path: 'order', component: OrderComponent },
  { path: 'mainmenu', component: MainmenuComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'login' }


];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
