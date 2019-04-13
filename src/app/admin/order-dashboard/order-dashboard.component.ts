import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css']
})
export class OrderDashboardComponent implements OnInit {
  orders;
  columnsToDisplay;
  columnsActualName;
  
  constructor(private spinnerService:Ng4LoadingSpinnerService, private cartService: CartService) { }

  ngOnInit() {
    this.orders = [{}];
    this.columnsToDisplay = ["Order Id", "Total Amount", "Status", "Ship To", "User Email", "Edit"],
    this.columnsActualName = {
      "Order Id": "order_id",
      "Total Amount": "totalamount",
      "Status": "status",
      "Email Id": "user.email" 
    }
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
