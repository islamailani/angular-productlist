import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { ProductService } from '../services/product.service'
import { CartService } from '../services/cart.service';

import ProductDto = Insite.Catalog.Services.Dtos.ProductDto;
import ProductCollectionModel = Insite.Catalog.WebApi.V1.ApiModels.ProductCollectionModel;
import { IProductCollectionParameters } from '../services/product.service';
import { ProductsFacade } from '../state/products';

@
Component({
    selector: 'productlist',
    //template: '<div [innerHTML]="template | keepHtml"></div>',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.css'],
    providers: [ProductsFacade, CartService],

    // encapsulation: ViewEncapsulation.Native  // shadowdom or polyfill 
    // encapsulation: ViewEncapsulation.None
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductListComponent implements OnInit {

    @Input()
    name;
    products: ProductDto[];
    productCollection$: Observable<ProductCollectionModel> = this.productsFacade.productCollection$;
    template: string = "some stuff";

    constructor(
        private http: HttpClient, 
        private productsFacade: ProductsFacade,
        private cartService: CartService) { }

    ngOnInit() {
        this.getProductData({ categoryId: "a926eb0b-1e10-4163-adaf-a67200d93e63" });
    }

    protected getProductData(params: IProductCollectionParameters, expand?: string[]): void {
        this.productsFacade.loadProducts(params.categoryId);
    }

    updateProductData = () => {
        const params: IProductCollectionParameters = {
            categoryId: "a926eb0b-1e10-4163-adaf-a67200d93e63",
            //page: this.productCollection.pagination.page,
            //pageSize: this.productCollection.pagination.pageSize,
            //sort: this.productCollection.pagination.sortType
        };

        this.getProductData(params);
    }

    addToCart(product: ProductDto) {
        this.cartService.addLineFromProduct(product, true).subscribe(
            cartLine => {

            });
    }
}
