import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TrayItem} from '../model/trayitem';
import {HospitalItem} from '../model/hospitalitem';
import {environment} from '../../environments/environment';

@Injectable()
export class OrderServiceService {

  private serviceURI = environment.gtinLookupURI;
  private hbicLookupURI = environment.hbicLookupURI ;
  private vcLookupURI = environment.vcLookupURI;

  returnedHospitalItem: Observable<HospitalItem> ;

  constructor(private http: HttpClient) { }

  getHospitalItem(hospitalItem: HospitalItem): Observable<HospitalItem> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // //headers.append("Authorization","Basic " + btoa("jlpicard:Changeme1") );
    // let options       = new RequestOptions({ headers: headers }); // Create a request option
    // let bodyString = JSON.stringify(userString); // Stringify payload'

    console.log('barcodeScanned: ' + hospitalItem.barcodeScanned );

    this.returnedHospitalItem = this.http.post<HospitalItem>(this.serviceURI , hospitalItem, httpOptions );
    console.log('received: ' + this.returnedHospitalItem );
    return this.returnedHospitalItem;
  }

  getHospitalItemFromHBIC(hospitalItem: HospitalItem): Observable<HospitalItem> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // //headers.append("Authorization","Basic " + btoa("jlpicard:Changeme1") );
    // let options       = new RequestOptions({ headers: headers }); // Create a request option
    // let bodyString = JSON.stringify(userString); // Stringify payload'

    console.log('barcodeScanned: ' + hospitalItem.barcodeScanned );

    this.returnedHospitalItem = this.http.post<HospitalItem>(this.hbicLookupURI , hospitalItem, httpOptions );
    console.log('received: ' + this.returnedHospitalItem );
    return this.returnedHospitalItem;
  }

  getHospitalItemFromVendorCat(hospitalItem: HospitalItem): Observable<HospitalItem> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // //headers.append("Authorization","Basic " + btoa("jlpicard:Changeme1") );
    // let options       = new RequestOptions({ headers: headers }); // Create a request option
    // let bodyString = JSON.stringify(userString); // Stringify payload'

    console.log('barcodeScanned: ' + hospitalItem.barcodeScanned );

    this.returnedHospitalItem = this.http.post<HospitalItem>(this.vcLookupURI , hospitalItem, httpOptions );
    console.log('received: ' + this.returnedHospitalItem );
    return this.returnedHospitalItem;
  }

}
