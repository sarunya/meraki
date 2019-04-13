import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import countStateCity from 'country-state-city';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, map, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';


export interface State {
  id: string;
  name: string;
  country_id: string;
}

export interface Address {
  name: string;
  email: string;
  phone: string,
  line1: string,
  line2: string,
  city: string,
  state: string,
  zipcode: string
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shipAsBilling = true;
  cart;
  allStates = countStateCity.getStatesOfCountry(101);
  filteredStates: Observable<State[]>;
  state;
  cartItemsCount;
  stateCtrl = new FormControl();
  private sub: Subscription;

  shippingInfo: Address;
  billingInfo: Address;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private cartService: CartService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.cart = {};
    this._getActiveCartDetails();
    this._populateAddressInfo();

    //console.log(countStateCity, countStateCity.getStatesOfCountry(101));
    // this.allStates = [{ id: "1", "name": "saru" }]
    // console.log(this.allStates[0], typeof this.allStates);
    // this.stateCtrl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(state => state ? this._filterStates(state) : this.allStates.slice())
    // );
    // // .subscribe(newValue => {
    // //   console.log("subscribe", newValue);

    // //   this.filteredStates = this._filterStates(newValue);
    // //   console.log(this.filteredStates);
    // // })

  }

  sameAsShipping() {
    console.log("sameAs Shipping ", this.shipAsBilling);
    const me = this;
    if (me.shipAsBilling) {
      // me.sfname=me.bfname;
      // me.semail=me.bemail;
      // me.sphone=me.bphone;
      // me.sline1=me.bline1;
      // me.sline2=me.bline2;
      // me.sstate=me.bstate;
      // me.scity=me.bcity;
      // me.szipcode=me.bzipcode;
    }
  }

  updateAddress() {
    const me = this;
    me.spinnerService.show();
    let accessToken = me.cookieService.get("g_access_token");
    let addressInfo = me._getAddressInfo();
    console.log(me.cart.id, addressInfo, accessToken);
    me.cartService.updateCartAddress(me.cart.id, addressInfo, accessToken).subscribe((res) => {
      console.log(res.body);
      //me.router.navigate(["order-confirmation"]);
      me._getActiveCartDetails();
      me._populateAddressInfo();
      me.spinnerService.hide();
    }, (err) => {
      console.log(err);
    })
  }

  placeOrder() {
    const me = this;
    me.spinnerService.show();
    // me.router.navigate(["order-confirmation", me.cart.id]);
    me.cartService.placeOrder(me.cart.id).subscribe((res) => {
      console.log(res.body);
      //me._getOrderByCartId(me.cart.id);
      me.spinnerService.hide();
      me.router.navigate(["confirmation", me.cart.id]);
    }, (err) => {
      console.log(err);
    })
  }

  private _populateAddressInfo() {
    const me = this;
    me.shippingInfo = {
      name: "",
      email: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: ""
    }
    me.billingInfo = Object.create(me.shippingInfo);
    console.log("shippikng_info", me.cart, me.cart.shipping_info)
    if (me.cart.shipping_info) {
      me.shippingInfo = me.cart.shipping_info;
    }
    if (me.cart.billing_info) {
      me.billingInfo = me.cart.billing_info;
    }
  }

  private _getAddressInfo() {
    const me = this;
    console.log("shi", me.shippingInfo);
    console.log("billingInfo", me.billingInfo);
    let addressInfo = {
      shipping_info: me.shippingInfo,
      billing_info: me.billingInfo
    }
    if (me.shipAsBilling) {
      addressInfo.shipping_info = addressInfo.billing_info
    }
    return addressInfo;
  }

  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();

    return this.allStates.filter((state) => {
      console.log(state.name, state.name.toLowerCase().indexOf(filterValue));
      return state.name.toLowerCase().indexOf(filterValue) === 0
    });
  }

  public onStateChanged(value) {
    console.log(value);
  }

  private _getOrderByCartId(cartId) {
    const me = this;
    me.spinnerService.show();
    me.cartService.getOrder(cartId).subscribe((res) => {
      me.cart = res.body;
      me._populateAddressInfo();
      me.cartItemsCount = me.cartService.getCartItemCount(me.cart);
      me.spinnerService.hide();
    });
  }

  private _getActiveCartDetails() {
    const me = this;
    me.spinnerService.show();
    let accessToken = me._getAccessToken();
    me.cartService.getCart(accessToken).subscribe((res) => {
      me.cart = res.body;
      me._populateAddressInfo();
      me.cartItemsCount = me.cartService.getCartItemCount(me.cart);
      me.spinnerService.hide();
    })
  }

  private _getAccessToken() {
    const me = this;
    return me.cookieService.get("g_access_token");
  }

}
