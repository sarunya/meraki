import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductListService } from '../services/product-list.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productdetail;
  productId;
  currentRate = 0; 

  constructor(private productListService: ProductListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productListService.getProductById(this.productId).subscribe((res) => {
      this.productdetail = res.body[0];
      this.currentRate = this.productdetail.rating;
    });
  }

}
