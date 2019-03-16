import { AppSettings } from '../AppSettings';
import { HttpUtility } from '../../utils/http-util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartPaths;
  private baseUrl;

  constructor(private httpUtil: HttpUtility) { 
    this.baseUrl = AppSettings.API_ENDPOINT;
    this.cartPaths = AppSettings.PATHS.carts;
  }

  public createCart(product, accessToken) {
    const me = this;
    let header = {g_access_token: accessToken};
    console.log(me.baseUrl+me.cartPaths.newcart, product, accessToken);
    return this.httpUtil.postHttpCall(me.baseUrl+me.cartPaths.newcart, product, header);
  }

  public getCart(accessToken) {
    const me = this;
    let header = {g_access_token: accessToken};
    return this.httpUtil.getHttpCall(me.baseUrl+me.cartPaths.newcart, header);
  }

}
