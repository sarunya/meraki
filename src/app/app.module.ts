import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderTopComponent } from './header-top/header-top.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { DisplayImageComponent } from './display-image/display-image.component';


// const appRoutes: Routes = [
//   { path: 'crisis-center', component: HeaderTopComponent },
//   { path: 'heroes', component: ProductListComponent },
// ];


@NgModule({
  declarations: [
    AppComponent,
    HeaderTopComponent,
    ProductListComponent,
    ProductCardComponent,
    DisplayImageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } // <-- debugging purposes only
    // )
  
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderTopComponent, ProductListComponent]
})
export class AppModule { }
