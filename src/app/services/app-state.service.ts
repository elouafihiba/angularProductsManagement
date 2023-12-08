import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productState: any ={
    products :[],
    keyword : "",
    totalePages :0,
    pageSize :3,
    currentPage :1,
    totaleProducts :0

};
  constructor() { }
  public setProductState(state : any):void {
    this.productState={...this.productState, state}

  }
}
