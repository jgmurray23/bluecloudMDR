import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OrderPrevService {

  constructor( private http: HttpClient ) { }

}
