import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from 'src/app/shared/models/products';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product?: Product;

  constructor(private cartService: CartService) { }

  addItemToCart() {
    this.product && this.cartService.addItemToCart(this.product);
  }
}
