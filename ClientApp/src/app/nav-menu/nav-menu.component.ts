import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import CartModel = Insite.Cart.WebApi.V1.ApiModels.CartModel;

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css'],
    providers: [CartService]
})
export class NavMenuComponent {
    cart: CartModel;
    
    constructor(private cartService: CartService) {
    }

    ngOnInit() {
        this.cartService.getCart().subscribe(
            cart => { this.cart = cart; });
    }
}
