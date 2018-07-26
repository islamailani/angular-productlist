import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

import ProductDto = Insite.Catalog.Services.Dtos.ProductDto;

@Component({
    selector: 'app-productdetail',
    templateUrl: './productdetail.component.html',
    styleUrls: ['./productdetail.component.css'],
    providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

    constructor(private router: Router, private service: ProductService) {}

    private sub: any;
    path: string;
    url;
    product: ProductDto;

    ngOnInit() {
        this.service.getCatalogPage(this.router.url).subscribe(
            catalogPage => {                
                this.service.getProduct(catalogPage.category.id, catalogPage.productId).subscribe(
                    product => {
                        this.product = product.product;
                    }
                )
            },
            error => {


            }
        );

        /*
        this.sub = this.route.params.subscribe(params => {
          this.path = params['path']; 
    
          // In a real app: dispatch action to load the details here.
        });
        */
    }
}
