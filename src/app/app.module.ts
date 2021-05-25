import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
// Modules
import { SharedModule } from './shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CategoryModule } from './category/category.module';
import { NotifierModule } from 'angular-notifier';
// Services
import { DataService } from './services/data.service';
// Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { EmptyComponent } from './empty/empty.component';
import { NotFoundComponent } from './not-found/not-found.component';


import { productsReducer } from './state/product.reducer';
import { ProductDataService } from './services/product-data-service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FrontPageComponent,
    ShoppingCartComponent,
    EmptyComponent,
    NotFoundComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TooltipModule.forRoot(),
    CategoryModule,
    StoreModule.forRoot({products: productsReducer}),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right'
        },
        vertical: {
          position: 'top'
        }
      }
    })
  ],
  providers: [DataService, ProductDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
