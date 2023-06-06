import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, CartItem, CartTotals } from '../shared/models/cart';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/products';
import { DeliveryMethod } from '../shared/models/deliveryMethod';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<Cart | null>(null);
  cartSource$ = this.cartSource.asObservable();
  private cartTotalSource = new BehaviorSubject<CartTotals | null>(null);
  cartTotalSource$ = this.cartTotalSource.asObservable();


  constructor(private http: HttpClient) { }

  createPaymentIntent() {
    return this.http.post<Cart>(this.baseUrl + 'payments/' + this.getCurrentCartValue()?.id, {})
      .pipe(map(cart => {
        this.cartSource.next(cart);
      })
      )
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    const cart = this.getCurrentCartValue();
    if (cart) {
      cart.shippingPrice = deliveryMethod.price;
      cart.deliveryMethodId = deliveryMethod.id;
      this.setCart(cart);
    }
  }

  getCart(id: string) {
    return this.http.get<Cart>(this.baseUrl + 'cart?id=' + id).subscribe({
      next: cart => {
        this.cartSource.next(cart);
        this.calculateTotals();
      }
    });
  }

  setCart(cart: Cart) {
    return this.http.post<Cart>(this.baseUrl + 'cart', cart).subscribe({
      next: cart => {
        this.cartSource.next(cart);
        this.calculateTotals();

      }
    });
  }

  getCurrentCartValue() {
    return this.cartSource.value;
  }

  addItemToCart(item: Product | CartItem, quantity = 1) {
    if (this.isProduct(item)) {
      item = this.mapProductItemToCartItem(item);
    }
    const cart = this.getCurrentCartValue() ?? this.createCart();
    cart.items = this.addOrUpdateItem(cart.items, item, quantity);
    this.setCart(cart);
  }

  removeItemFromCart(id: number, quantity = 1) {
    const cart = this.getCurrentCartValue();
    if (!cart) return;
    const item = cart.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        cart.items.filter(x => x.id !== id);
      }
      if (cart.items.length > 0) {
        this.setCart(cart);
      } else {
        this.deleteCart(cart);
      }
    }
  }
  deleteCart(cart: Cart) {
    return this.http.delete(this.baseUrl + 'cart?id=' + cart.id).subscribe({
      next: () => {
        this.deleteLocalCart();
      }
    });
  }

  deleteLocalCart() {
    this.cartSource.next(null);
    this.cartTotalSource.next(null);
    localStorage.removeItem('cart_id');
  }

  private addOrUpdateItem(items: CartItem[], itemToAdd: CartItem, quantity: number): CartItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }

    return items;
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }

  private mapProductItemToCartItem(item: Product): CartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private calculateTotals() {
    const cart = this.getCurrentCartValue();
    if (!cart) return;

    const subtotal = cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + cart.shippingPrice;
    this.cartTotalSource.next({ shipping: cart.shippingPrice, total, subtotal });
  }


  private isProduct(item: Product | CartItem): item is Product {
    return (item as Product).productBrand !== undefined;
  }
}
