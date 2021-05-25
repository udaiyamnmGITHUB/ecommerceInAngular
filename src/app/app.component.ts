import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Store, select } from '@ngrx/store';

import { ProductDataService } from './services/product-data-service';
import { selectProducts} from './state/product.selectors';
import { retrievedProductList } from './state/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products$ = this.store.pipe(select(selectProducts));

  constructor(private dataService: DataService, private productDataService :ProductDataService, private store: Store<any>) {}

  ngOnInit() {
   this.productDataService
      .getAllProductList()
      .subscribe(ProductInfo => this.store.dispatch(retrievedProductList({ ProductInfo })));
  }

}
