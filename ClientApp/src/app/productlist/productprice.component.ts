import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service'
import {ViewEncapsulation} from '@angular/core';

import ProductDto = Insite.Catalog.Services.Dtos.ProductDto;

@Component({
    selector: 'isc-product-price',
    templateUrl: './productprice.component.html',
    styleUrls: ['./productprice.component.css'],
    providers: [ProductService],
    
    encapsulation: ViewEncapsulation.Native  // shadowdom or polyfill 
    // encapsulation: ViewEncapsulation.None
    //encapsulation: ViewEncapsulation.Emulated 
    })
 
    export class ProductPriceComponent implements OnInit{
        @Input() product : ProductDto;
        constructor(){            
        }
        ngOnInit(){
            console.log(this.product.shortDescription);
        }
    }
