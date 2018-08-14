import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { productsReducer, ProductsFacade } from './products'
import { ProductService } from '../services/product.service';

@NgModule({
    imports: [
        EffectsModule.forRoot([
            ProductsFacade
        ]), 

        // Signature matches AppState interface
        StoreModule.forRoot({
            productCollection: productsReducer
        }),

        StoreDevtoolsModule.instrument({ maxAge: 25 })
    ],
    providers: [
        ProductsFacade,
        ProductService
    ],
})
export class AppStateModule { }
