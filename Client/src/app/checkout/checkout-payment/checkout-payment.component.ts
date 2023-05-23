import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/shared/models/user';
import { CheckoutService } from '../checkout.service';
import { CartService } from 'src/app/cart/cart.service';
import { Cart } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(private cartService: CartService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router) { }

  submitOrder() {
    const cart = this.cartService.getCurrentCartValue();
    if (!cart) return;
    const orderToCreate = this.getOrderToCreate(cart);
    if (!orderToCreate) return;

    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: order => {
        this.toastr.success('Order created successfully');
        this.cartService.deleteLocalCart();
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
      }
    })
  }

  private getOrderToCreate(cart: Cart) {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;
    if (!deliveryMethodId || !shipToAddress) return;
    return {
      cartId: cart.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }
}