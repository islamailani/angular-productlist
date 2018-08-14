import { AppState } from '../state';

import * as ProductsActions from './products.actions';
import ProductCollectionModel = Insite.Catalog.WebApi.V1.ApiModels.ProductCollectionModel;

export type Action =  ProductsActions.All;

export namespace ProductsQuery {
    export const getProducts = (state: AppState) => state.productCollection;
}

/// Reducer function
export function productsReducer(state: ProductCollectionModel, action: Action) {

  switch (action.type) {

    case ProductsActions.GET_PRODUCTS:
          return { ...state };

    case ProductsActions.GET_PRODUCTS_SUCCESS:
          return { ...state, ...action.payload };

    default:
        return state;
  }
}
