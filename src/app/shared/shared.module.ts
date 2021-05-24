import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
// Components
import { ProductThumbnailComponent } from './components/product-thumbnail/product-thumbnail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { QuantityInputComponent } from './components/quantity-input/quantity-input.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
// Directives
import { DigitOnlyDirective } from './directives/digit-only.directive';

@NgModule({
  declarations: [
    // Components
    ProductThumbnailComponent,
    ProductListComponent,
    DropdownComponent,
    QuantityInputComponent,
    FieldErrorDisplayComponent,
    // Directives
    DigitOnlyDirective
  ],
  imports: [BrowserModule, PaginationModule.forRoot(), LazyLoadImageModule],
  exports: [
    // Components
    ProductThumbnailComponent,
    ProductListComponent,
    DropdownComponent,
    QuantityInputComponent,
    FieldErrorDisplayComponent,
    // Directives
    DigitOnlyDirective
  ]
})
export class SharedModule {}
