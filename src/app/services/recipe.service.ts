import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import { Recipe } from '../model/recipe';
import {environment} from '../../environments/environment';
import {TrayItem} from '../model/TrayItem';


@Injectable()
export class RecipeService {

  //private serviceURL = 'http://localhost:3002/recipe.json';
  recipesO: Observable<TrayItem[]>;
  recipes:  TrayItem[] = [];

  private serviceURL = environment.serviceURL;

  constructor(private http: HttpClient ) { }

  getTrayItem(trayItem: TrayItem): Observable<TrayItem[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // //headers.append("Authorization","Basic " + btoa("jlpicard:Changeme1") );
    // let options       = new RequestOptions({ headers: headers }); // Create a request option
    // let bodyString = JSON.stringify(userString); // Stringify payload'

    console.log('getTrayItem()' + trayItem.trayId );

    this.recipesO = this.http.post<TrayItem[]>(this.serviceURL, trayItem, httpOptions );
    return this.recipesO;


  }
}
