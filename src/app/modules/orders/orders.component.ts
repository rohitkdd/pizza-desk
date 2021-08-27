import { Component, OnInit } from '@angular/core';
import { PizzaOrder, Size } from 'src/app/shared/models/order-pizza.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  isLoading = false;

  constructor(private orderService: OrderService) { }
  orders: PizzaOrder[] = [];

  ngOnInit() {
    this.getPizzaOrders();
  }

  getPizzaOrders() {
    this.isLoading = true;
    this.orderService.getPizzaOrders().subscribe((orders: PizzaOrder[]) => {
      if (orders) {
        if (orders.length) {
          this.orders = orders;
          this.isLoading = false;
          this.orders.forEach((order) => {
            order.pizzaSize = Size[order.Size];
          });
        } else {
          this.isLoading = false;
        }
      }
    });
  }

  completeOrder(orderId: number) {
    this.orderService.completeOrder(orderId).subscribe((orderCompleted: any) => {
      if (orderCompleted && orderCompleted.message) {
        this.orders = [];
        this.getPizzaOrders();
      }
    });
  }

}
