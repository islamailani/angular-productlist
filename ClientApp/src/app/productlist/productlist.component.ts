import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service'
import { ViewEncapsulation } from '@angular/core';

import ProductDto = Insite.Catalog.Services.Dtos.ProductDto;

@Component({
    selector: 'productlist',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.css'],
    providers: [ProductService],

    // encapsulation: ViewEncapsulation.Native  // shadowdom or polyfill 
    // encapsulation: ViewEncapsulation.None
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductListComponent implements OnInit {

    @Input()
    name;
    products: ProductDto[];

    constructor(private service: ProductService) {}

    ngOnInit() {
        var products = this.service.GetProducts({ categoryId: "7f0a8434-149b-4389-8903-a64b011872d8" }).subscribe(
            productCollection => {
                this.products = productCollection.products;
            },
            error => { console.log('an error occurred'); }
        )
    }
}
