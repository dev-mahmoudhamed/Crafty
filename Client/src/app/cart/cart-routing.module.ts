import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';


const routes: Routes = [
  { path: '', component: CartComponent, data: { breadcrumb: 'Home' } },

];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CartRoutingModule { }
