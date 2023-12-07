import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Category, Order, Payment, PaymentMethod, User } from '../Components/models/models';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = "https://shoponlineapidemo.azurewebsites.net/api/Shopping/";

  constructor(private http: HttpClient) { }

  getCategoryList() {
    let url = this.baseUrl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        })
      )
    );
  }


  getProducts(category: string, subcategory: string, count: number) {
    return this.http.get<any[]>(this.baseUrl + 'GetProducts', {
      params: new HttpParams()
        .set('category', category)
        .set('subcategory', subcategory)
        .set('count', count)
    });
  }

  getProduct(id: number) {
    let url = this.baseUrl + "GetProduct/" + id;
    return this.http.get(url);
  }

  registerUser(user: User) {
    let url = this.baseUrl + "RegisterUser";
    return this.http.post(url, user, {responseType: 'text'});
  }

  loginUser(email: string, password: string) {
    let url = this.baseUrl + "LoginUser";
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

  submitReview(userid: number, productid: number, review: string) {
    let obj: any = {
      User: {
        Id: userid,
      },
      Product: {
        Id: productid,
      },
      Value: review,
    };

    let url = this.baseUrl + "InsertReview";
    return this.http.post(url, obj, {responseType: 'text'});
  }

  getAllReviewsOfProduct(productId: number) {
    let url = this.baseUrl + "GetProductReviews/" + productId;
    return this.http.get(url);
  }

  addToCart(userid: number, productid: number) {
    let url = 
    this.baseUrl + 'InsertCartItem/' + userid + '/' + productid;
    return this.http.post(url, null, {responseType: 'text'});
  }

  getActiveCartOfUser(userid: number) {
    let url = this.baseUrl + 'GetActiveCartOfUser/' + userid;
    return this.http.get(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = this.baseUrl + "GetAllPreviousCartsOfUser/" + userid;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = this.baseUrl + "GetPaymentMethods";
    return this.http.get<PaymentMethod[]>(url);
  }

  insertPayment(payment: Payment) {
    return this.http.post(this.baseUrl + 'InsertPayment', payment,
    { responseType: 'text'});
  }

  insertOrder(order: Order) {
    return this.http.post(this.baseUrl + "InsertOrder", order);
  }

}
