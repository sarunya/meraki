import { ProductListService } from './product-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products;

  constructor(private productListService: ProductListService) { }

  ngOnInit() {
    this.productListService.getProducts().subscribe((res) => {
      this.products = res.body;
    });
  }

}
