import { ProductListService } from '../../services/product-list.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products;
  showLoading;
  @ViewChild(ProductCardComponent) productCardChild;

  constructor(private spinService: Ng4LoadingSpinnerService, private productListService: ProductListService) { }

  ngOnInit() {
    this.productListService.getProducts().subscribe((res) => {
      this.products = res.body;
    });
  }

  receiveMessage(loadingShow) {
    this.loadingSpinnerShow(loadingShow);
  }

  loadingSpinnerShow (loadingShow) {
    const me = this;
    if(loadingShow) {
      me.spinService.show();
    } else {
      me.spinService.hide();
    }
  }

}
