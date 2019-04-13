import { ProductListService } from './../../../services/product-list.service';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  products
  categories
  sortedProducts
  constructor(private productListService: ProductListService) { }

  ngOnInit() {
    this.products = [];
    this.categories = [];
    this.productListService.getProducts().subscribe((res) => {
      this.products = res.body;
      this.categories = this.getArrayOfValues(res.body, "description");
      console.log(this.categories);
      this.sortedProducts = this.products.slice();
    });
    this.sortedProducts = this.products.slice();
  }

  getArrayOfValues(objArray, key) {
    return objArray.map(a => a[key]);
  }

  sortData(sort: Sort) {
    const me = this;
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedProducts = data;
      return;
    }

    this.sortedProducts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Product Id': return me._compare(a.id, b.id, isAsc);
        case 'Category': return me._compare(a.description, b.description, isAsc);
        case 'Title': return me._compare(a.title, b.title, isAsc);
        case 'Price': return me._compare(a.unit_price, b.unit_price, isAsc);
        default: return 0;
      }
    });
  }

  _compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}
