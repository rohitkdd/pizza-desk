import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PizzaOrder } from 'src/app/shared/models/order-pizza.model';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  baseUrl = '/api/orders';
  constructor(private http: HttpClient) { }

  getPizzaOrders() {
    return this.http.get(this.baseUrl);
  }

  completeOrder(orderId: number) {
    return this.http.delete(`${this.baseUrl}/${orderId}`);
  }

  createOrder(authToken, orderRequest: PizzaOrder) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+ authToken);
    return this.http.post(this.baseUrl, orderRequest, {headers: headers});
  }

  generateAuthToken(authRequest) {
    return this.http.post('/api/auth', authRequest);
  }
  
}
