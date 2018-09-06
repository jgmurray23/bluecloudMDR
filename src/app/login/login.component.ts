import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoginxferService} from '../services/loginxfer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit {

  @ViewChild('inp1') vc: ElementRef;

  barcodeScanned: string;

  constructor(private router: Router, public loginxfer: LoginxferService ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.vc.nativeElement.focus();

    window.setTimeout(() => {
        this.vc.nativeElement.focus();
      }
    );
  }



  loginButtonPressed() {
    console.log("login button pressed");
    this.loginxfer.login = this.barcodeScanned;

    if ( this.barcodeScanned.length > 4 ) {
      this.router.navigate(['/mainmenu'], );
    }
    else {
      this.barcodeScanned = '';
    }


  }


}
