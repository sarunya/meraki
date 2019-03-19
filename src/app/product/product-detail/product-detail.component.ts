import { CartService } from './../../services/cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductListService } from '../../services/product-list.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productdetail;
  productId;
  currentRate = 0; 
  itemQty = 1;

  constructor(private cartService: CartService, private spinService: Ng4LoadingSpinnerService, private productListService: ProductListService, private route: ActivatedRoute) { }

  ngOnInit() {
    const me = this;
    me.itemQty = 1;
    me.getProductDetails();
    me.spinService.hide();
  }

  getProductDetails(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productListService.getProductById(this.productId).subscribe((res) => {
      this.productdetail = res.body;
      this.currentRate = this.productdetail.rating;
    });
  }


  public addProductToCart(product) {
    const me = this;
    me.spinService.show();
    me.cartService.addProductToCart(product, me.itemQty);
  }

}
