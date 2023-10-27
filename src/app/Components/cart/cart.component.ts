import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/Services/navigation.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Cart, Payment } from '../models/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  userCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: ''
  };

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  usersPreviousCarts: Cart[] = [];

  constructor(public utilityService: UtilityService,
    public navigationService: NavigationService) 
    {}
  
  ngOnInit(): void {
    //Get Cart
    this.navigationService
    .getActiveCartOfUser(this.utilityService.getUser().id)
    .subscribe((res: any) => {
      this.userCart = res;

      //Calculate Payment
      this.utilityService.calculatePayment(
        this.userCart,
        this.usersPaymentInfo
      );
    });

    //Get Previous Carts
    this.navigationService
    .getAllPreviousCarts(this.utilityService.getUser().id)
    .subscribe((res: any) => {
      this.usersPreviousCarts = res;
    });
  }

}
