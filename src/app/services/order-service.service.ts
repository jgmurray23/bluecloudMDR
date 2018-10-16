import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
//import {TrayItem} from '../model/trayitem';
import {HospitalItem} from '../model/hospitalitem';
import {environment} from '../../environments/environment';
import {TrayDefinition} from '../model/traydefinition';

@Injectable()
export class OrderServiceService {

  private serviceURI = environment.gtinLookupURI;
  private hbicLookupURI = environment.hbicLookupURI ;
  private vcLookupURI = environment.vcLookupURI;
  private oldordersLookupURI = environment.oldordersLookupURI ;
  private getTraynamesURI = environment.getTraynamesURI;
  private getTrayMissingItemsTwoWeeksURI = environment.getTrayMissingItemsTwoWeeksURI ;

  returnedHospitalItem: Observable<HospitalItem> ;
  returnedHospitalItems: Observable<HospitalItem[]> ;
  trayDefinitions: Observable<TrayDefinition[]>;
  trayDefinitionsTwoWeeks: Observable<HospitalItem[]>;

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

  getPrevOrders(): Observable<HospitalItem[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // //headers.append("Authorization","Basic " + btoa("jlpicard:Changeme1") );
    // let options       = new RequestOptions({ headers: headers }); // Create a request option
    // let bodyString = JSON.stringify(userString); // Stringify payload'

    this.returnedHospitalItems = this.http.get<HospitalItem[]>(this.oldordersLookupURI, httpOptions );

    this.returnedHospitalItems.forEach( eachObj => {
        eachObj.forEach( hospitalItem => {

          //console.log('###forEach');
          //console.log( hospitalItem.orderId );
          const datestring = new Date ( hospitalItem.logtimestamp ).toLocaleDateString();
          //console.log(datestring);
          hospitalItem.datestring = datestring;

          //hospitalItem.logtimestamp = datestring;

        });

    });

    //console.log( this.returnedHospitalItems );
    return this.returnedHospitalItems;
  }

  getTrayDefinitions(): Observable<TrayDefinition[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // //headers.append("Authorization","Basic " + btoa("jlpicard:Changeme1") );
    // let options       = new RequestOptions({ headers: headers }); // Create a request option
    // let bodyString = JSON.stringify(userString); // Stringify payload'

    this.trayDefinitions = this.http.get<TrayDefinition[]>(this.getTraynamesURI, httpOptions )
    console.log( this.trayDefinitions );
    return this.trayDefinitions;
  }

  getTrayMissingItemsTwoWeeks(trayDefinition): Observable<HospitalItem[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // //headers.append("Authorization","Basic " + btoa("jlpicard:Changeme1") );
    // let options       = new RequestOptions({ headers: headers }); // Create a request option
    // let bodyString = JSON.stringify(userString); // Stringify payload'

    this.trayDefinitionsTwoWeeks = this.http.post<HospitalItem[]>(this.getTrayMissingItemsTwoWeeksURI, trayDefinition , httpOptions );
    return this.trayDefinitionsTwoWeeks;
  }

}
