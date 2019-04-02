import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  order;
  constructor(private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    const me = this;
    me.order = {shipping_info: {}, billing_info:{}};
    me._getOrderDetails();
  }

  private _getOrderDetails() {
    const me = this;
    let cartId = me.route.snapshot.paramMap.get('cartid');
    me.cartService.getOrder(cartId).subscribe((res) => {
      me.order = res.body;
      console.log("order", me.order);
    });
  }

}
