import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HospitalItem} from '../model/hospitalitem';

@Injectable()
export class SaveService {

  private saveURI = environment.saveURI;
  private saveMissingURI = environment.saveMissingURI ;
  private saveReplacedURI = environment.saveReplacedURI ;
  returnedHospitalItem: Observable<HospitalItem> ;

  constructor(private http: HttpClient) { }

  saveOrder(hospitalItem: HospitalItem): Observable<HospitalItem> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // //headers.append("Authorization","Basic " + btoa("jlpicard:Changeme1") );
    // let options       = new RequestOptions({ headers: headers }); // Create a request option
    // let bodyString = JSON.stringify(userString); // Stringify payload'

    console.log('oid: ' + hospitalItem.orderId );

    this.returnedHospitalItem = this.http.post<HospitalItem>(this.saveURI , hospitalItem, httpOptions );
    console.log('received: ' + this.returnedHospitalItem );
    return this.returnedHospitalItem;
  }

  saveMissing(hospitalItem: HospitalItem) {

    console.log('saveMISSING Service');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log('oidSM: ' + hospitalItem.orderId);
    this.http.post<HospitalItem>(this.saveMissingURI, hospitalItem, httpOptions).subscribe(returned => {
      console.log(returned);
    }, err => {
      console.log('error' + err);
    }, () => {
      console.log('complete');

    });
  }

  saveReplaced(t_hospitalItem: HospitalItem) {

    console.log('saveREPLACED Service');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log('oidREPLACEDTrayMissingOrderItemsId: ' + t_hospitalItem.TrayMissingOrderItemsId );
    this.http.post(this.saveReplacedURI, t_hospitalItem, httpOptions).subscribe(returned => {
      console.log(returned);
    }, err => {
      console.log('error' + err);
    }, () => {
      console.log('complete');

    });
  }


}
