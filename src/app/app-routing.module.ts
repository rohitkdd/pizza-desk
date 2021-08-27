import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './container/layout/layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
      { path: 'orders', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule) }
    ]
  },
  { 
    path: '**', redirectTo: '' 
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
