import { CookieService } from 'ngx-cookie-service';
import { AppSettings } from '../AppSettings';
import { HttpUtility } from '../../utils/http-util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner/ng4LoadingSpinner.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartPaths;
  private baseUrl;

  constructor(private httpUtil: HttpUtility, private cookieService: CookieService, private router: Router) {
    this.baseUrl = AppSettings.API_ENDPOINT;
    this.cartPaths = AppSettings.PATHS.carts;
  }

  addProductToCart(product, quantity) {
    const me = this;
    let accessToken = me.cookieService.get("g_access_token");
    if (accessToken) {
      let payload = {
        product_id: product.id,
        quantity: quantity
      }
      me.createCart(payload, accessToken).subscribe((cart) => {
        console.log("cart", cart);
        me.router.navigate(["cartdetail"]);
      }, (err) => {
        console.log(err);
      }, () => {
        return true;
      })
    } else {
      me.alterLogin();
      return false;
    }
  }

  alterLogin() {
    alert("Please login to continue");
  }

  public createCart(product, accessToken) {
    const me = this;
    let header = { g_access_token: accessToken };
    console.log(me.baseUrl + me.cartPaths.newcart, product, accessToken);
    return this.httpUtil.postHttpCall(me.baseUrl + me.cartPaths.newcart, product, header);
  }

  public updateCart(cartId, product, accessToken) {
    const me = this;
    let header = { g_access_token: accessToken };
    let url = me.parse(me.baseUrl + me.cartPaths.updatecart, cartId);
    console.log(url, product, accessToken);
    return this.httpUtil.postHttpCall(url, product, header);
  }

  public parse(...str) {
    var args = [].slice.call(str, 1),
      i = 0;

    return str[0].replace(/%s/g, () => args[i++]);
  }

  public getCart(accessToken) {
    const me = this;
    let header = { g_access_token: accessToken };
    return this.httpUtil.getHttpCall(me.baseUrl + me.cartPaths.newcart, header);
  }

}
