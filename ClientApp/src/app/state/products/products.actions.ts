import { Action } from '@ngrx/store';
import ProductCollectionModel = Insite.Catalog.WebApi.V1.ApiModels.ProductCollectionModel;
import { IProductCollectionParameters } from '../../services/product.service';

export const GET_PRODUCTS           = 'Products get';
export const GET_PRODUCTS_SUCCESS =   'Products get success';

export class GetProducts implements Action {
    readonly type = GET_PRODUCTS;
    constructor(public payload: IProductCollectionParameters) {}
}

export class GetProductsSuccess implements Action {
    readonly type = GET_PRODUCTS_SUCCESS;
    constructor(public payload: ProductCollectionModel) {}
}

export type All
    = GetProducts
      | GetProductsSuccess;
