import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orders ;
  constructor(private spinnerService:Ng4LoadingSpinnerService, private cartService: CartService) { }

  ngOnInit() {
    this.orders = [{}];
    this.getAllOrders();
  }

  private getAllOrders() {
    const me = this;
    me.spinnerService.show();
    me.cartService.getuserorders().subscribe((res) => {
      me.orders = res.body
      for (let i=0;i<me.orders.length;i++) {
        me.orders[i] = me.orders[i].data;
      }
      me.spinnerService.hide();
    });
  }

}
