import { AppSettings } from '../AppSettings';
import { HttpUtility } from '../../utils/http-util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private productPaths;
  private baseUrl;

  constructor(private httpUtil: HttpUtility) { 
    this.baseUrl = AppSettings.API_ENDPOINT;
    this.productPaths = AppSettings.PATHS.products;
  }

  public getProducts() {
    return this.httpUtil.getHttpCall(this.baseUrl+this.productPaths.get);
  }

  public getProductById(id : Text) {
    return this.httpUtil.getHttpCall(this.baseUrl+this.productPaths.get+"/"+id);
  }

  public addProductToCart(product) {
    return this.httpUtil.getHttpCall(this.baseUrl+this.productPaths.get+"/");
  }

}
