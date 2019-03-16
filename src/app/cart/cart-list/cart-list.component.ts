import { Component, OnInit, Input } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cart;
  constructor(private cartService: CartService, private cookieService: CookieService) { }

  ngOnInit() {
    this._getCartDetails();
    this.cart = { products: [] };
  }

  private _getCartDetails() {
    const me = this;
    let accessToken = me._getAccessToken();
    me.cartService.getCart(accessToken).subscribe((res) => {
      me.cart = res.body;
    })
  }

  private _getAccessToken() {
    const me = this;
    return me.cookieService.get("g_access_token");
  }

}
