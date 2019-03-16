import { CartItemComponent } from './../cart-item/cart-item.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cart;
  @ViewChild(CartItemComponent) cartItemComponent;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private cartService: CartService, private cookieService: CookieService) { }

  ngOnInit() {
    this.cart = { products: [] };
    this._getCartDetails();
  }

  private _getCartDetails() {
    const me = this;
    me.spinnerService.show();
    let accessToken = me._getAccessToken();
    me.cartService.getCart(accessToken).subscribe((res) => {
      me.cart = res.body;
      me.spinnerService.hide();
    })
  }

  private _getAccessToken() {
    const me = this;
    return me.cookieService.get("g_access_token");
  }

  receiveCartUpdateEvent(updatedCart) {
    const me = this;
    me.cart = updatedCart;
    me.ngOnInit();
  }

}
