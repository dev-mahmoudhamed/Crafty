import { Component, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';
@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent {

  @Input() appStepper?: CdkStepper;

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  createPaymentIntent() {
    this.cartService.createPaymentIntent().subscribe({
      next: () => {
        this.appStepper?.next();
      },
      error: error => this.toastr.error(error.message)
    })
  }

}