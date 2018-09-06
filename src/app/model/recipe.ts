import {Type} from '@angular/core';

export class Recipe {
  stocknumber: string;
  vendorcatalognumber: string;
  description: string;
  //qty: string;
  trayId: string;
  createdDate: number;
  lastUpdatedDate: number;
  vencats: Map<string, string >;


}

