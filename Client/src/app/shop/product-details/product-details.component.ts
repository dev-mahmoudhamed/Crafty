import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/products';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CartService } from 'src/app/cart/cart.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity = 1;
  quantityInCart = 0;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.shopService.getProduct(+id).subscribe({
      next: productReturned => {
        this.product = productReturned;
        this.bcService.set('@productDetails', productReturned.name);
        this.cartService.cartSource$.pipe(take(1)).subscribe({
          next: cart => {
            const item = cart?.items.find(x => x.id === +id);
            if (item) {
              this.quantity = item.quantity;
              this.quantityInCart = item.quantity;
            }
          }
        });
      },
      error: err => console.log(err)
    });
  }


  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }

  updateCart() {
    if (this.product) {
      if (this.quantity > this.quantityInCart) {
        const itemToAdd = this.quantity - this.quantityInCart;
        this.quantityInCart += itemToAdd;
        this.cartService.addItemToCart(this.product, itemToAdd);
      } else {
        const itemToRemove = this.quantityInCart - this.quantity;
        this.quantityInCart -= itemToRemove;
        this.cartService.removeItemFromCart(this.product.id, itemToRemove);

      }
    }
  }

  get buttonText() {
    return this.quantityInCart === 0 ? 'Add to cart' : 'Update cart';
  }
}
