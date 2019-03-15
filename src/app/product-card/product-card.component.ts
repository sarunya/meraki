import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { UserService } from './../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product;
  @ViewChild('signInBtn') signInBtn: ElementRef;
  signIn;

  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  addProductToCart(product) {
    console.log(JSON.stringify(product, null, 10));
    let accessToken = this.cookieService.get("g_access_token");
    if (accessToken) {
      this.userService.validateUserCall(accessToken).subscribe((res) => {
        console.log(res.body);
        //else call add to cart api;
      }, (err) => {
        console.log(err);
        this.alterLogin();
      });
    } else {
      this.alterLogin();
    }
  }

  alterLogin() {
    // this.signIn = false;
    // let el: HTMLElement = this.signInBtn.nativeElement as HTMLElement;
    // el.click();
    alert("Please Login To Add the Product to cart");
  }

}
