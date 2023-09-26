import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule  } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ProductsComponent } from './Components/products/products.component';
import { SuggestedProductsComponent } from './Components/suggested-products/suggested-products.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderComponent } from './Components/order/order.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    WelcomeComponent,
    ProductsComponent,
    SuggestedProductsComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
