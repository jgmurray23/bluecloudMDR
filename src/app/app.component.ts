import {Component, NgModule} from '@angular/core';


import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatGridListModule,
  MatListModule,
  MatNavList,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

import {MatSortModule} from '@angular/material';
import {MatDivider} from '@angular/material';
import {MatDividerModule} from '@angular/material';
import {MatGridTile} from '@angular/material';


@NgModule({
  imports: [
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule,
    MatDivider,
    MatDividerModule,
    MatGridTile,
    MatNavList,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
