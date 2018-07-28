import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './productlist/productlist.component'
import { ProductPriceComponent } from './productlist/productprice.component';
import { ProductDetailComponent } from './productdetail/productdetail.component';
import { PagerComponent } from './productlist/pager.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ProductListComponent,
        ProductPriceComponent,
        ProductDetailComponent,
        PagerComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'Category', component: ProductListComponent },
            { path: '**', component: ProductDetailComponent }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
