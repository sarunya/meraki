import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  cartId; 
  orders;
  orderStatus;

  constructor(private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderStatus = {};
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    this.cartId = this.route.snapshot.paramMap.get('cartid');
    this.cartService.getOrder(this.cartId).subscribe((res) => {
      this.orders = res.body;
      console.log(this.orders);
    });
  }

  updateOrderStatus() {
    const me = this;
    console.log(me.orderStatus);
  }

}
