import { Component } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { CartItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(public cartService: CartService) { }
  getCount(items: CartItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

}
