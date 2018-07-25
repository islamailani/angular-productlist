import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import ProductDto = Insite.Catalog.Services.Dtos.ProductDto;
import ProductCollectionModel = Insite.Catalog.WebApi.V1.ApiModels.ProductCollectionModel;

export interface IProductCollectionParameters {
    categoryId?: System.Guid;
    query?: string;
    page?: number;
    pageSize?: number;
    sort?: string;
    attributeValueIds?: string[];
    priceFilters?: string[];
    productIds?: System.Guid[];
    names?: string[];
    erpNumbers?: string[];
    extendedNames?: string[];
    replaceProducts?: boolean;
    productPriceParameters?: IProductPriceParameter;
    includeSuggestions?: string;
    searchWithin?: string;
    getAllAttributeFacets?: boolean;
    topSellersMaxResults?: number;
    topSellersCategoryIds?: System.Guid[];
    applyPersonalization?: boolean;
    includeAttributes?: string;
}

// parameters accepted by get getProduct
export interface IProductParameters {
    categoryId?: string;
    productId: string;
    addToRecentlyViewed?: boolean;
    alsoPurchasedMaxResults?: number;
    expand?: string;
}

export interface IProductPriceParameter {
    productId: string;
    unitOfMeasure?: string;
    qtyOrdered?: number;
    configuration?: string[];
}

@Injectable()
export class ProductService {
    testDomain = "http://trunk.local.com/";
    productServiceUri = "/api/v1/products/";
    categoryServiceUri = "/api/v1/categories";
    catalogPageServiceUri = "/api/v1/catalogpages";
    webCrossSellUri = "/api/v1/websites/current/crosssells";
    productSettingsUri = "/api/v1/settings/products";
    realTimePricingUri = "/api/v1/realtimepricing";
    realTimeInventoryUri = "/api/v1/realtimeinventory";

    constructor(private http: HttpClient) {
        console.log('ProductService: constructor');
    }
    
    products : ProductDto[]

    DoSomething() : number {
        var product :  ProductDto;
        return 3;
    }

    GetProducts(parameters: IProductCollectionParameters, expand?: string[], filter?: string[]) : Observable<ProductCollectionModel> {
        var address = this.testDomain + this.productServiceUri;
        var params = this.getProductsParams(parameters, expand, filter);
        return this.http.get<ProductCollectionModel>(address, { params : params } );
    }

    protected getProductsParams(parameters: IProductCollectionParameters, expand?: string[], filter?: string[]): any {
        const params = parameters as any;

        if (expand) {
            params.expand = expand.join();
        }

        if (filter) {
            params.filter = filter.join();
        }

        return params;
    }
}