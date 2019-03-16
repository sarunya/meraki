import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { UserService } from './../services/user.service';
import { CookieService } from 'ngx-cookie-service';

import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product;
  @ViewChild('signInBtn') signInBtn: ElementRef;
  signIn;

  constructor(private spinService: Ng4LoadingSpinnerService, private userService: UserService, private cookieService: CookieService, private cartService: CartService,private router: Router) { }

  ngOnInit() {
  }

  addProductToCart(product) {
    const me = this;
    console.log(JSON.stringify(product, null, 10));
    me.spinService.show();
    let accessToken = me.cookieService.get("g_access_token");
    if (accessToken) {
      me.userService.validateUserCall(accessToken).subscribe((res) => {
        console.log(res.body);
        //else call add to cart api;
        let payload = {
          product_id: product.id,
          quantity: 1
        }
        me.cartService.createCart(payload, accessToken). subscribe((cart) => {
          console.log(cart.body);
          this.router.navigate(["cartdetail"]);
          me.spinService.hide();
        }, (err) => {
          me.spinService.hide();
          console.log(err);
        })
      }, (err) => {
        me.spinService.hide();
        console.log(err);
        me.alterLogin();
      });
    } else {
      me.spinService.hide();
      me.alterLogin();
    }
  }

  alterLogin() {
    // this.signIn = false;
    // let el: HTMLElement = this.signInBtn.nativeElement as HTMLElement;
    // el.click();
    alert("Please Login To Add the Product to cart");
  }

}
