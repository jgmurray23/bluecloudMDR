import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginxferService} from '../services/loginxfer.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  constructor( private loginxfer: LoginxferService, private router: Router) { }
  
  user = '' ;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.user = this.loginxfer.login ;
    console.log('##user: ' + this.user );

    if ( !this.user ) {
      console.log( 'user undefined' );
      this.router.navigate(['/login'] );
    }
  }

}
