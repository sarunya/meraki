import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProductSearchComponent } from './admin/product-dashboard/product-search/product-search.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryItemComponent } from './categories/category-item/category-item.component';
import { FooterComponent } from './home/footer/footer.component';
import { HomeCategoryComponent } from './home/home-category/home-category.component';
import { AboutusComponent } from './about/aboutus/aboutus.component';
import { TeammemberComponent } from './about/teammember/teammember.component';
import { ProductfilterComponent } from './product/product-filter/productfilter.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {DemoMaterialModule} from '../material-module';
import { OrderConfirmationComponent } from './checkout/order-confirmation/order-confirmation.component';
import { MyordersComponent } from './checkout/myorders/myorders.component';
import { ProductUpdateComponent } from './admin/product-update/product-update.component';
import { MyDashboardComponent } from './admin/my-dashboard/my-dashboard.component';
import { OrderUpdateComponent } from './admin/order-update/order-update.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { OrderDashboardComponent } from './admin/order-dashboard/order-dashboard.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: "full" },
  { path: 'home', component: DisplayImageComponent },
  { path: 'productdetail/:id', component: ProductDetailComponent },
  { path: 'cartdetail', component: CartListComponent },
  { path: 'category', component: CategoriesComponent },
  { path: 'admin', component: ProductSearchComponent },
  { path: 'admin/order/list', component: OrderDashboardComponent },
  { path: 'admin/product/list', component: ProductSearchComponent },
  { path: 'admin/overall/dashboard', component: MyDashboardComponent },
  { path: 'admin/product/update/:id', component: ProductUpdateComponent },
  { path: 'admin/order/update/:cartId', component: OrderUpdateComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'products', component: ProductfilterComponent},
  { path: 'confirmation/:cartid', component: OrderConfirmationComponent},
  { path: 'myorders', component: MyordersComponent}
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
    HomeCategoryComponent,
    AboutusComponent,
    TeammemberComponent,
    ProductfilterComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    MyordersComponent,
    ProductUpdateComponent,
    MyDashboardComponent,
    OrderDashboardComponent,
    OrderUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true,
        scrollPositionRestoration: 'enabled'
      } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [Globals, CookieService],
  bootstrap: [AppComponent] //[AppComponent, HeaderTopComponent, ProductListComponent]
})
export class AppModule { }
