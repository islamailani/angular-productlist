import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { ProductService } from '../services/product.service'
import { CartService } from '../services/cart.service';

import ProductDto = Insite.Catalog.Services.Dtos.ProductDto;
import ProductCollectionModel = Insite.Catalog.WebApi.V1.ApiModels.ProductCollectionModel;
import PaginationModel = Insite.Core.WebApi.PaginationModel;
import { IProductCollectionParameters } from '../services/product.service';
import { ProductsFacade } from '../state/products';

@Component({
    selector: 'productlist',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.css'],
    providers: [ProductsFacade, CartService],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductListComponent implements OnInit {

    productCollection$: Observable<ProductCollectionModel> = this.productsFacade.productCollection$;

    constructor(
        private http: HttpClient, 
        private productsFacade: ProductsFacade,
        private cartService: CartService) { }

    ngOnInit() {
        this.updateProductData(null)
    }

    protected getProductData(params: IProductCollectionParameters, expand?: string[]): void {
        this.productsFacade.loadProducts(params);
    }

    updateProductData = (pagination?: PaginationModel) => {
        const params: IProductCollectionParameters = {
            categoryId: "a926eb0b-1e10-4163-adaf-a67200d93e63",
            page: pagination ? pagination.page : null,
            pageSize: pagination ? pagination!.pageSize : null,
            sort: pagination ? pagination!.sortType : null
        };

        this.getProductData(params);
    }

    addToCart(product: ProductDto) {
        this.cartService.addLineFromProduct(product, true).subscribe(
            cartLine => {

            });
    }
}
