import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderAuth, PizzaOrder, Size } from 'src/app/shared/models/order-pizza.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { Auth } from '../../order.const';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  isFormProcessing: boolean;

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private toastr: ToastrService) { }

  orderForm: FormGroup;
  flavors = ['Veggie Surprise', 'Tandoori Paneer', 'Fresh Mushroom', 'Margherita', 'Creamy Cheese', 'Chicken Fajita', 'Chicken Shawarma', 'Chicken Spicy Ranch'];
  crusts = ['San Francisco', 'Pan', 'Stuffed Crust'];
  tableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  size = Size;
  isFormSubmitted = false;

  ngOnInit() {
    this.initializeOrderForm();
  }

  initializeOrderForm() {
    this.orderForm = this.formBuilder.group({
      flavor: ['', Validators.required],
      crust: ['', Validators.required],
      pizzaSize: ['', Validators.required],
      tableNumber: ['', Validators.required],
    });
  }

  resetForm() {
    this.isFormSubmitted = false;
    this.isFormProcessing = false;
    this.orderForm.reset();
    this.initializeOrderForm();
  }

  submitOrder() {
    this.isFormSubmitted = true;

    if (this.orderForm.valid) {
      this.isFormProcessing = true;

      const orderRequest = new PizzaOrder();
      orderRequest.Flavor = this.orderForm.get('flavor').value;
      orderRequest.Crust = this.orderForm.get('crust').value;
      orderRequest.Size = this.orderForm.get('pizzaSize').value;
      orderRequest.Table_No = this.orderForm.get('tableNumber').value;

      this.processOrder(orderRequest);
    }
  }

  processOrder(orderRequest) {
    const authToken = sessionStorage.getItem('orderAuth');
    if (authToken) {
      this.createOrder(authToken, orderRequest);
    } else {
      const orderAuth = new OrderAuth();
      orderAuth.username = Auth.AuthUser;
      orderAuth.password = Auth.AuthPassword;

      this.orderService.generateAuthToken(orderAuth).subscribe((tokenObject: any) => {
        if (tokenObject && tokenObject.access_token) {
          sessionStorage.setItem('orderAuth', tokenObject.access_token);
          this.createOrder(tokenObject.access_token, orderRequest);
        }
      }, (error) => {
        this.isFormProcessing = false;
      });
    }
  }

  createOrder(authToken, orderRequest) {
    this.orderService.createOrder(authToken, orderRequest).subscribe((orderPlaced: PizzaOrder) => {
      if (orderPlaced) {
        this.toastr.success('Order placed successfully');
        this.resetForm();
      }
    }, (error) => {
      if (error.statusText === 'UNAUTHORIZED' && error.error.msg.includes('expired')) {
        sessionStorage.removeItem('orderAuth');
        this.processOrder(orderRequest);
      }
    });
  }
}
