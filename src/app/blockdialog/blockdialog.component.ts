import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-blockdialog',
  templateUrl: './blockdialog.component.html',
  styleUrls: ['./blockdialog.component.css']
})
export class BlockdialogComponent {

  modalTitle = 'Waiting...'

  constructor() { }

  ngOnInit() {
  }

}
