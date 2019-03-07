import { AppSettings } from './../AppSettings';
import { HttpUtility } from './../../utils/http-util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private productPaths;

  constructor(private httpUtil: HttpUtility) { 
    this.productPaths = AppSettings.PATHS.products;
  }

  public getProducts() {
    return this.httpUtil.getHttpCall(this.productPaths.get);
  }

}
