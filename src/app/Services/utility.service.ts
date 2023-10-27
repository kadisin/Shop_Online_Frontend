import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cart, Payment, Product, User } from '../Components/models/models';
import { Subject } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  changeCart = new Subject();

  constructor(private jwt: JwtHelperService,
    public navigationService: NavigationService) { }

  applyDiscount(price: number, discount: number) : number {
    let finalPrice: number = price - price * (discount/100);
    return finalPrice;
  }

  // JWT Helper Service : npm install @auth0/angular-jwt

  getUser() : User {
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstname,
      lastName: token.lastname,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdAt: token.createdat,
      modifiedAt: token.modifiedat,
    };
    return user;
  }

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('user');
  }

  addToCart(product: Product) {
    let productid = product.id;
    let userid = this.getUser().id;

    this.navigationService.addToCart(userid, productid).subscribe((res: any) => {
      if(res.toString() === 'inserted') {
        this.changeCart.next(1);
      }
    });
  }

  calculatePayment(cart: Cart, payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for(let cartItem of cart.cartItems)
    {
      payment.totalAmount += cartItem.product.price;

      payment.amountReduced += cartItem.product.price -
      this.applyDiscount(cartItem.product.price, cartItem.product.offer.discount);

      payment.amountPaid += this.applyDiscount(cartItem.product.price,
        cartItem.product.offer.discount);

      if(payment.amountPaid > 50000) payment.shipingCharges = 2000;
      else if(payment.amountPaid > 20000) payment.shipingCharges = 1000;
      else if(payment.amountPaid > 5000) payment.shipingCharges = 500;
      else payment.shipingCharges = 200;
    }
  }

  calculatePricePaid(cart: Cart) {
    let pricepaid = 0;
    for(let cartitem of cart.cartItems)
    {
      pricepaid += this.applyDiscount(cartitem.product.price,
        cartitem.product.offer.discount);
    }
    return pricepaid;
  }
}
