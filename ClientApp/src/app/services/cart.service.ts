import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import ProductDto = Insite.Catalog.Services.Dtos.ProductDto;
import CartLineModel = Insite.Cart.WebApi.V1.ApiModels.CartLineModel;
import CartModel = Insite.Cart.WebApi.V1.ApiModels.CartModel;

@Injectable()
export class CartService
{
    serviceUri = "/api/v1/carts";

    cartLinesUri = "";
    currentCartLinesUri = "/api/v1/carts/current/cartlines";

    currentCart: CartModel = null;

    constructor(private http: HttpClient) {
    }

    getCart(cartId?: string, suppressApiErrors = false):Observable<CartModel> {
        if (!cartId) {
            cartId = "current";
        }

        const uri = `${this.serviceUri}/${cartId}`;

        //return this.http.get<CartModel>(uri);

        return this.http.get<CartModel>(uri).map(cart => {
            this.getCartCompleted(cart, cartId);
            return cart;
        });
    }

    getCartCompleted(cart: CartModel, cartId) {
        this.cartLinesUri = cart.cartLinesUri;
        if (cartId === "current") {
            this.currentCart = cart;
            this.currentCartLinesUri = cart.cartLinesUri;
        }
    }

    addLineFromProduct(product: ProductDto,toCurrentCart = false, showAddToCartPopup?: boolean): Observable<CartLineModel> {
        const cartLine = {} as CartLineModel;
        cartLine.productId = product.id;
        cartLine.qtyOrdered = product.qtyOrdered;
        cartLine.unitOfMeasure = product.unitOfMeasure;

        return this.addLine(cartLine, toCurrentCart, showAddToCartPopup);
    }

    addLine(cartLine: CartLineModel, toCurrentCart = false, showAddToCartPopup?: boolean): Observable<CartLineModel> {
        const parsedQty = parseFloat(cartLine.qtyOrdered.toString());
        cartLine.qtyOrdered = parsedQty > 0 ? parsedQty : 1;

        const postUrl = toCurrentCart ? this.currentCartLinesUri : this.cartLinesUri;

        return this.http.post<CartLineModel>(postUrl, cartLine);
    }
}
