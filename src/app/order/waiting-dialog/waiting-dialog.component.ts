import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-waiting-dialog',
  templateUrl: './waiting-dialog.component.html',
  styleUrls: ['./waiting-dialog.component.css']
})
export class WaitingDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WaitingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onUtClick(): void {
    console.log("onNoClick");
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
