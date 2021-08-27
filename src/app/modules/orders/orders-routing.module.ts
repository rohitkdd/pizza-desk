import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { AuthGuard } from './../../auth.guard';

const routes: Routes = [
  { path: '', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'place-order', component: CreateOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
