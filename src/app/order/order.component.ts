import {Component, Input, OnInit, ElementRef, Renderer2, AfterViewInit, ViewChild, Inject} from '@angular/core';
import {HospitalItem} from '../model/hospitalitem';
import {
  MatSort,
  MatTableDataSource,
  MatSpinner,
  MatProgressSpinner,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material';
import {MatGridList} from '@angular/material';
import {MatGridTile} from '@angular/material';
// import {TrayItem} from '../model/trayitem';
import {RecipeService} from '../services/recipe.service';
import {OrderServiceService} from '../services/order-service.service';
//import {WaitingDialogComponent} from './waiting-dialog/waiting-dialog.component';
import {SaveService} from '../services/save.service';
import {Idle} from 'idlejs/dist';
import {Router} from '@angular/router';
import { LoginxferService } from '../services/loginxfer.service';
import {TrayDefinition} from '../model/traydefinition';
import {Observable} from 'rxjs/Observable';
import {BlockdialogComponent} from '../blockdialog/blockdialog.component';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements  AfterViewInit, OnInit {

  @ViewChild('inp1') vc: ElementRef;
  @ViewChild('inp2') vclot: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  // with predefined events on `document`
   idle = new Idle()
    .whenNotInteractive()
    .within(5 )
    .do(() =>  { console.log('timeout');
    this.router.navigate(['/login'], ); })
    .start();

  showPrevOrdersTable = false;

    orderstate = '';
  public color = 'primary';
  mode = 'indeterminate';
  value = 50;
  strlen = 0;

  missingItemsReturned;
  hospitalItemForSave: HospitalItem;
  hospitalItem: HospitalItem = new HospitalItem();
  hospitalItems: HospitalItem[] = [];
  barcodeScanned: string;
  lotScanned: string;
  user = 'mdruser@jbh.org' ;
  placeholder = 'Scan PRODUCT' ;
  displayedColumns = [ 'stocknum', 'vendorcatalognumber', 'lotnum', 'serialnum', 'description', 'Remove', 'barcodeScanned', 'emailAddress', 'orderId', 'missing' ];
  displayedColumns1 = [ 'stocknum', 'vendorcatalognumber', 'lotnum', 'serialnum', 'description', 'Remove', 'barcodeScanned', 'emailAddress', 'orderId', 'logtimestamp' ];
  displayedColumns2 = [ 'stocknum', 'vendorcatalognumber', 'lotnum', 'serialnum', 'description', 'emailAddress', 'orderId', 'replaced' ];


  traydefinitions: TrayDefinition[] ;
  traydefinitionselected;

  // traydefinitions = [
  //   {value: '01.701.2602018', viewValue: '2018 - Ortho'},
  //   {value: '01.701.2602017', viewValue: '2017 - Optho'}
  //
  // ];


  dataSource = new MatTableDataSource<HospitalItem>();

  dataSource1 = new MatTableDataSource<HospitalItem>();

  dataSource2 = new MatTableDataSource<HospitalItem>();


  constructor( private loginxfer: LoginxferService, private router: Router, private saveService: SaveService, private orderService: OrderServiceService, public dialog: MatDialog ) { }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
  };
    const dialogRef = this.dialog.open( BlockdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log( 'Dialog was closed' ) ;
      console.log(result) ;
    });
  }

  openDialog(): void {

    this.openModal();

    // console.log( 'opening dialog....' );
    // const dialogRef = this.dialog.open( DialogOverviewExampleDialog, {
    //   width: '250px',
    //
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //
    //   console.log('After dialog was closed');
    //   this.mode = 'determinate' ;
    //   this.color = 'accent';
    //   this.value = 0 ;
    //
    //   this.vc.nativeElement.focus() ;
    //
    // });

  }



  public closeDialog(): void {
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.orderstate = 'START';

  }

  ngAfterViewInit() {

    //this.traydefinitions = this.orderService.getTrayDefinitions() ;

    this.getTrayDefinitions();

    this.user = this.loginxfer.login ;
    console.log('##user: ' + this.user );

    if ( !this.user ) {
      console.log( 'user undefined' );
      this.router.navigate(['/login'] );
    }
    this.dataSource.sort = this.sort;
    this.vc.nativeElement.focus();

    window.setTimeout(() => {
        this.vc.nativeElement.focus();
      }
     );
  }

   onChange(event) {

     this.dataSource = new MatTableDataSource<HospitalItem>();
    // this.dataSource.data = [];
    // this.dataSource2.data = [];
    //this.resetHospitalItem();
    this.refreshMissing();

    // console.log('$$$$$$$$$$$$$$onchange - load missing items');
    //  //const missingitems = this.orderService.getTrayMissingItemsTwoWeeks() ;
    //  this.orderService.getTrayMissingItemsTwoWeeks(this.traydefinitionselected).subscribe( itemsReturned => {
    //    this.dataSource2.data = itemsReturned;
    //    this.missingItemsReturned = itemsReturned;
    //  });
    //  //console.log('miss' + missingitems);
    // // const missingitems = this.orderService.getTrayMissingItemsTwoWeeks() ;
    // // console.log(missingitems);
  }

  refreshMissing() {
    console.log('$$$$$$$$$$$$$$onchange - load missing items');
    this.orderService.getTrayMissingItemsTwoWeeks(this.traydefinitionselected).subscribe( itemsReturned => {
      this.dataSource2.data = itemsReturned;
      this.missingItemsReturned = itemsReturned;
    });
  }

  focusFunction(event) {
    console.log('focusFunction-1');

    this.vc.nativeElement.focus() ;
  }
  focusOutFunction(event) {
    console.log('focusOutFunction');
    this.vc.nativeElement.focus() ;
  }

  optChange(event) {
    console.log(event); // It will display the select city data
    this.vc.nativeElement.focus() ;
  }

  buttonPressed() {
    this.openDialog();
  }

  getTrayDefinitions() {

    this.orderService.getTrayDefinitions().subscribe( trayDefinitionReturned => {
      console.log(trayDefinitionReturned);
      //this.dataSource.data = hospitalItemsReturned;
      this.traydefinitions = trayDefinitionReturned ;

      //this.costItems = hospitalItemsReturned;
      //this.processCost();

    });
  }

  gotolot() {

    //this.hospitalItem = new HospitalItem();

    if ( ( this.barcodeScanned.startsWith('01') )  && (  this.barcodeScanned.length  > 16 )  ) {
      this.processStryker();
    } else if ( this.barcodeScanned.startsWith('01') ) {
      console.log('01!!');
      this.resetHospitalItem();
      this.processGTIN();
    } else if ( this.barcodeScanned.startsWith('+') && !this.barcodeScanned.startsWith('+$') &&  ('START' === this.orderstate ) ) {
      console.log('+ HBIC!!');
      this.resetHospitalItem();
      this.processHBIC();
    } else if ( this.barcodeScanned.startsWith('+$') ) {
        console.log('+ HBIC LOT');
        //this.resetHospitalItem();
        this.processLOT();
    } else if ( this.barcodeScanned.startsWith('10') ) {
      this.processLOT();
    } else if ( this.barcodeScanned.startsWith('11') ) {
      this.processSERIAL();
    }
    else if ( this.barcodeScanned.length > 2 ) {
      this.processNONCAT();
    }
    else {
      console.log('nothing!'); this.barcodeScanned = '' ;
    }
  }

  processNONCAT() {

    //TODO - reset all hospitalitem paramaters
    console.log('processNONCAT: ' + this.orderstate);

    if ('START' === this.orderstate) {
      console.log('processNONTCAT');
    }

    this.placeholder = 'Scan PRODUCT';
    this.orderstate = 'START';
    this.hospitalItem.lotnum = 'NOLOT'
    this.hospitalItem.lotnumber = this.hospitalItem.lotnum;


    this.openDialog();

    this.refreshNONCAT();

  }

  resetHospitalItem() {

    this.hospitalItem.gtin = '';
    this.hospitalItem.hbic = '';
    this.hospitalItem.lotnum = '';
    this.hospitalItem.serialnum = '';
    this.hospitalItem.stocknum = '';
    this.hospitalItem.vendorcat = '';
    this.hospitalItem.vendorcatalognumber = '';
    this.hospitalItem.missing = false;


  }
  //+H67920100805
  processHBIC() {

    console.log('processHBIC');
    this.strlen = ( this.barcodeScanned.length - 2 -5  );
    console.log( 'strlen: ' + this.strlen );
    this.hospitalItem.hbic = this.barcodeScanned.substr(5, this.strlen );
    this.hospitalItem.vendorcatalognumber = this.hospitalItem.hbic;

    this.hospitalItem.vendorcat = this.hospitalItem.hbic;
    console.log('##VC: ' + this.hospitalItem.vendorcat );
    this.placeholder = 'Scan LOT#';
    this.barcodeScanned = '';
    this.mode = 'determinate' ;
    this.color = 'accent';
    this.value = 0 ;
    this.orderstate = 'LOT';

    this.vc.nativeElement.focus() ;

  }

  processGTIN() {

    this.hospitalItem.gtin = this.barcodeScanned.substr(2, 14);
    this.placeholder = 'Scan LOT#';
    this.barcodeScanned = '';
    this.mode = 'determinate' ;
    this.color = 'accent';
    this.value = 0 ;
    this.orderstate = 'LOT';

    this.vc.nativeElement.focus() ;

  }

  processStryker() {
    console.log('processStryker');
    this.hospitalItem.gtin = this.barcodeScanned.substr(2, 14);

    this.mode = 'determinate' ;
    this.color = 'accent';
    this.value = 0 ;

    this.placeholder = 'Scan PRODUCT';
    this.orderstate = 'START';
    this.hospitalItem.lotnum = this.barcodeScanned.substring(18);
    this.hospitalItem.lotnumber = this.hospitalItem.lotnum;
    this.barcodeScanned = '';
    this.openDialog();
    this.refresh();

  }

  processLOT() {

    //TODO - reset all hospitalitem paramaters
    console.log('processLOT: ' + this.orderstate);

    if ('START' === this.orderstate) {
      this.barcodeScanned = '';
      return;
    }

    this.placeholder = 'Scan PRODUCT';
    this.orderstate = 'START';
    this.hospitalItem.lotnum = this.barcodeScanned.substring(2);
    this.hospitalItem.lotnumber = this.hospitalItem.lotnum;


    this.openDialog();

    if (this.hospitalItem.gtin ) {
      this.refresh();
  } else {
      console.log('calling REFRESH HBIC');
      this.refreshHBIC() ;
    }


  }

  saveReplaced() {
    console.log('save replaced');

    for (let i = 0; i < this.dataSource2.data.length; i++) {
      console.log('i: ' + i);


      if ( this.dataSource2.data[i].replaced ) {

        console.log('replaced$$' + this.dataSource2.data[i].TrayMissingOrderItemsId );

        this.saveService.saveReplaced( this.dataSource2.data[i] );
        //this.dataSource2.data.itemsReturned.push( hItemForSave );
        //this.missingItemsReturned.push(hItemForSave);
        //this.dataSource2.data = this.missingItemsReturned;

      }
      this.refreshMissing();
    }


  }

  save() {

    console.log('save button - opening dialog...');
    console.log( this.traydefinitionselected );



    for ( let i = 0; i < this.hospitalItems.length ; i++ ) {
      console.log('i: ' + i );

      if ( this.hospitalItems[i].orderId == null  ) {

        this.hospitalItems[i].barcode = this.hospitalItems[i].barcodeScanned;
        this.hospitalItems[i].vendorcatalognumber = this.hospitalItems[i].vendorcat;
        this.hospitalItems[i].costcentre = '01.701.2602018';
        this.hospitalItems[i].emailAddress = this.user;
        this.hospitalItems[i].stocknumber = this.hospitalItems[i].stocknum ;

        this.saveEach(this.hospitalItems[i]);

      } else {console.log('skipping ' + i ); }

    }
  }

  saveEach( hItemForSave: HospitalItem ) {

    this.openDialog();

    this.saveService.saveOrder(hItemForSave).subscribe(hospitalItemReturned => {
      console.log('oid: ' + hospitalItemReturned.orderId );
      hItemForSave.orderId = hospitalItemReturned.orderId ;
      if ( this.traydefinitionselected ) {
        hItemForSave.trayName = this.traydefinitionselected.trayName;
        //hItemForSave.trayId = this.traydefinitionselected.trayId;
      }

      hItemForSave.remover = 'done' ;

      if ( hItemForSave.missing ) {

        console.log('##missing##');
        //add to missing list
        hItemForSave.trayName = this.traydefinitionselected.trayName;
        hItemForSave.trayId = this.traydefinitionselected.trayId;
        console.log('td-tn' + this.traydefinitionselected.trayName );
        //hItemForSave.trayId = this.traydefinitionselected.trayId;
        //console.log('trayId' + hItemForSave.trayId );
        console.log('trayName' + hItemForSave.trayName );

        this.saveService.saveMissing( hItemForSave );
        //this.dataSource2.data.itemsReturned.push( hItemForSave );
        this.missingItemsReturned.push(hItemForSave);
        this.dataSource2.data = this.missingItemsReturned;

      }

    }, error1 => {
      console.log('error is: ' + error1 );
        this.closeDialog();
    },   () => {

      console.log('complete');
      this.closeDialog();
    });


    this.vc.nativeElement.focus();

  }

  refreshPREV() {

    console.log('calling refreshPREV...');
    this.showPrevOrdersTable = true;

    this.orderService.getPrevOrders().subscribe(hospitalItemsReturned => {

      //console.log('hospitalItemsReturned');
      //console.log(hospitalItemsReturned);
      this.dataSource1.data = hospitalItemsReturned;
    });

    this.vc.nativeElement.focus();

    this.hospitalItems.forEach(hi => {
      console.log( 'hazza!' ) ;
      console.log( hi.missing );
    });

  }

  refreshNONCAT() {

    console.log('calling refreshNONCAT...');
    this.hospitalItem.vendorcat = this.barcodeScanned;
    this.hospitalItem.vendorcatalognumber = this.barcodeScanned;
    console.log('##VC: ' + this.hospitalItem.vendorcat  );
    this.orderService.getHospitalItemFromVendorCat( this.hospitalItem ).subscribe( hospitalItemReturned => {
      console.log(hospitalItemReturned);
      hospitalItemReturned.barcodeScanned = hospitalItemReturned.vendorcatalognumber + 'NOLOT';
      hospitalItemReturned.remover = 'highlight_off';
      hospitalItemReturned.missing = false;
      this.hospitalItems.push(hospitalItemReturned);
      this.dataSource.data = this.hospitalItems;
      this.closeDialog();
    }, error1 => {
      console.log('error is: ' + error1 );
      this.closeDialog();
    });

    this.barcodeScanned = '';
    this.vc.nativeElement.focus();
  }

  refreshHBIC() {

    console.log('calling refreshHBIC...');
    console.log('##VC: ' + this.hospitalItem.vendorcat );

    this.orderService.getHospitalItemFromHBIC(this.hospitalItem).subscribe(hospitalItemReturned => {
      //console.log('sn: ' + hospitalItemReturned.stocknum);
      console.log(hospitalItemReturned);
      // if undefined skip over it - don't add it to the list
      //if (hospitalItemReturned.stocknum) {
      // hospitalItemReturned.barcodeScanned = hospitalItemReturned.gtin + hospitalItemReturned.lotnum;

      hospitalItemReturned.barcodeScanned = hospitalItemReturned.hbic + hospitalItemReturned.lotnum;
      hospitalItemReturned.lotnumber = hospitalItemReturned.lotnum;
      hospitalItemReturned.serialnumber = hospitalItemReturned.serialnum;
      hospitalItemReturned.remover = 'highlight_off';
      hospitalItemReturned.missing = false;
      this.hospitalItems.push(hospitalItemReturned);
      //}
      this.dataSource.data = this.hospitalItems;
      this.closeDialog();

    }, error1 => {
      console.log('error is: ' + error1 );
      this.closeDialog();
    });


    this.barcodeScanned = '';
    this.vc.nativeElement.focus();

  }

  refresh() {

    console.log('calling refresh...');

    this.orderService.getHospitalItem(this.hospitalItem).subscribe(hospitalItemReturned => {
      //console.log('sn: ' + hospitalItemReturned.stocknum);
      console.log(hospitalItemReturned);
      // if undefined skip over it - don't add it to the list
      //if (hospitalItemReturned.stocknum) {
      // hospitalItemReturned.barcodeScanned = hospitalItemReturned.gtin + hospitalItemReturned.lotnum;
      hospitalItemReturned.barcodeScanned = hospitalItemReturned.gtin + hospitalItemReturned.lotnum;
      hospitalItemReturned.lotnumber = hospitalItemReturned.lotnum;
      hospitalItemReturned.serialnumber = hospitalItemReturned.serialnum;
      hospitalItemReturned.remover = 'highlight_off';
      hospitalItemReturned.missing = false;
      this.hospitalItems.push(hospitalItemReturned);
      //}
      this.dataSource.data = this.hospitalItems;
      this.closeDialog();

    }, error1 => {
      console.log('error is: ' + error1 );
      this.closeDialog();
    });


    this.barcodeScanned = '';
    this.vc.nativeElement.focus();

  }
  processSERIAL() {

    console.log('processSERIAL: ' + this.orderstate );
    if ( 'START' === this.orderstate ) {
      this.barcodeScanned = '';
      return;
    }
    this.placeholder = 'Scan PRODUCT';
    this.orderstate = 'START';
    this.hospitalItem.serialnum = this.barcodeScanned.substring(2);
    //TODO
    // check with backend for serialnumber requirements
    this.hospitalItem.serialnumber = this.hospitalItem.serialnum;
    this.openDialog();
    this.refresh();

  }

  refreshold() {

      this.hospitalItem.barcodeScanned = this.barcodeScanned + this.lotScanned;
      this.hospitalItem.gtin = this.barcodeScanned.substr(2, 14);

      if (this.lotScanned.substring(2) && this.lotScanned.startsWith('10', 0)) {
        this.hospitalItem.lotnum = this.lotScanned.substring(2);
      } else {
        this.hospitalItem.lotnum = 'NOLOT';
      }


      //console.log('gtin: ' + this.hospitalItem.gtin);

      console.log('this.hospitalItem.barcodeScanned: ' + this.hospitalItem.gtin);

      this.orderService.getHospitalItem(this.hospitalItem).subscribe(hospitalItemReturned => {
        console.log('sn: ' + hospitalItemReturned.stocknum);

        // if undefined skip over it
        if (hospitalItemReturned.stocknum) {
          // hospitalItemReturned.barcodeScanned = hospitalItemReturned.gtin + hospitalItemReturned.lotnum;
          hospitalItemReturned.missing = false;
          this.hospitalItems.push(hospitalItemReturned);
        }
        this.dataSource.data = this.hospitalItems;
      });

      this.barcodeScanned = '';
      this.lotScanned = '';
      this.vc.nativeElement.focus();

  }

  refresh2() {
    console.log('refresh2') ;

    this.vc.nativeElement.focus();

  }

  public removeItemFromArray( value1: HospitalItem ) {
    console.log( 'imabutton: ' + value1.stocknum );

    const index: number = this.hospitalItems.indexOf(value1);
    console.log('index ' + index);
    if (index !== -1) {
      this.hospitalItems.splice(index, 1);
      this.dataSource.data = this.hospitalItems ;
    }

  }

}

// @Component({
//   selector: 'waiting-dialog',
//   templateUrl: 'waiting-dialog/waiting-dialog.component.html',
// })
// export class DialogOverviewExampleDialog {
//
//   mode = 'indeterminate' ;
//   color = 'accent';
//   value = 0 ;
//
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//
//
// }
