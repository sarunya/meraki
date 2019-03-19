import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product;
  @Output() loadingInfoEvent = new EventEmitter<boolean>();
  signIn;
  loadingShow = false;

  constructor(private userService: UserService, private cookieService: CookieService, private cartService: CartService,private router: Router) { }

  ngOnInit() {
  }

  addProductToCart(product) {
    const me = this;
    me.sendMessage(true);
    let accessToken = me.cookieService.get("g_access_token");
    if (accessToken) {
      //me.userService.validateUserCall(accessToken).subscribe((res) => {
        //else call add to cart api;
        let payload = {
          product_id: product.id,
          quantity: 1
        }
        me.cartService.createCart(payload, accessToken). subscribe((cart) => {
          this.router.navigate(["cartdetail"]);
          me.sendMessage(false);
        }, (err) => {
          me.sendMessage(false);
          console.log(err);
        })
      // }, (err) => {
      //   me.sendMessage(false);
      //   console.log(err);
      //   me.alterLogin();
      // });
    } else {
      me.sendMessage(false);
      me.alterLogin();
    }
  }

  sendMessage(loadingInfo) {
    const me = this;
    me.loadingShow = loadingInfo;
    me.loadingInfoEvent.emit(me.loadingShow);
  }

  alterLogin() {
    // this.signIn = false;
    // let el: HTMLElement = this.signInBtn.nativeElement as HTMLElement;
    // el.click();
    alert("Please Login To Add the Product to cart");
  }

}
