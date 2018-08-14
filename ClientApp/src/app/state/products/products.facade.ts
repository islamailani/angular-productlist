import { Injectable }                 from '@angular/core';
import { Store }                      from '@ngrx/store';
import { Effect, Actions }            from '@ngrx/effects';

import { Observable }                 from 'rxjs/Observable';
import { of }                         from 'rxjs/observable/of';
//import '../../utils/rxjs.operators';

import {AppState} from '../state';
import ProductCollectionModel = Insite.Catalog.WebApi.V1.ApiModels.ProductCollectionModel;
import { IProductCollectionParameters } from '../../services/product.service';

import {ProductsQuery} from './products.reducer';
import * as productsActions from './products.actions';
import { ProductService } from '../../services/product.service';

import '../utils/rxjs.operators';

type Action = productsActions.All;

@Injectable()
export class ProductsFacade {

    productCollection$ = this.store.select(ProductsQuery.getProducts);

    @Effect()
    getProducts$: Observable<Action> = this.actions$
        .ofType(productsActions.GET_PRODUCTS)
        .map((action: productsActions.GetProducts) => action.payload )
        .mergeMap(payload => this.productService.GetProducts(payload))
        .map(products => {
            return new productsActions.GetProductsSuccess(products);
        });

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private productService: ProductService
    ) { }

    loadProducts(params: IProductCollectionParameters): void {
        this.store.dispatch(new productsActions.GetProducts(params));
    }
}
