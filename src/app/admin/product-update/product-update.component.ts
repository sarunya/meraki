import { ProductListService } from './../../services/product-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productId;
  productdetail;
  constructor(private productListService: ProductListService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    const me = this;
    me.productdetail = {};
    me.getProductDetails();
  }

  getProductDetails(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productListService.getProductById(this.productId).subscribe((res) => {
      this.productdetail = res.body;
      console.log(this.productdetail);
    });
  }

  updateProductItem() {
    const me = this;
    console.log(me.productdetail);
  }

}
