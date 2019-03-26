import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';


import { AppComponent } from './app.component';
import { HeaderTopComponent } from './home/header-top/header-top.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { DisplayImageComponent } from './home/display-image/display-image.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import {Globals} from './globals';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule } from '@angular/forms';
import { ProductSearchComponent } from './admin/product-dashboard/product-search/product-search.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryItemComponent } from './categories/category-item/category-item.component';
import { FooterComponent } from './home/footer/footer.component';
import { HomeCategoryComponent } from './home/home-category/home-category.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: "full" },
  { path: 'home', component: DisplayImageComponent },
  { path: 'productdetail/:id', component: ProductDetailComponent },
  { path: 'cartdetail', component: CartListComponent },
  { path: 'category', component: CategoriesComponent },
  { path: 'admin', component: ProductSearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderTopComponent,
    ProductListComponent,
    ProductCardComponent,
    DisplayImageComponent,
    ProductDetailComponent,
    CartListComponent,
    CartItemComponent,
    ProductSearchComponent,
    CategoriesComponent,
    CategoryItemComponent,
    FooterComponent,
    HomeCategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )

  ],
  providers: [Globals, CookieService],
  bootstrap: [AppComponent] //[AppComponent, HeaderTopComponent, ProductListComponent]
})
export class AppModule { }
