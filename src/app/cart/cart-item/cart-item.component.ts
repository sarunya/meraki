import { CookieService } from 'ngx-cookie-service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item;
  @Input() cartId = null;
  @Output() cartChangeEvent = new EventEmitter<any>();

  constructor(private cartService: CartService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  removeItem(item) {
    const me = this;
    let accessToken = me.cookieService.get("g_access_token");
    console.log(item, me.cartId, accessToken);
    let payload = {
      product_id: item.product_id,
      quantity: 0
    }
    me.cartService.updateCart(me.cartId, payload, accessToken).subscribe((res) => {
        console.log(res.body);
        me.sendCartChangeEvent(res.body);
    }, (err) => {
      console.log(err);
    })
  }

  sendCartChangeEvent(updatedCart) {
    const me = this;
    me.cartChangeEvent.emit(updatedCart);
  }

}
