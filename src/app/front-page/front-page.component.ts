import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ProductInfo } from '../interface/ec-template.interface';
import { Store, select } from '@ngrx/store';

import { selectProducts} from '../state/product.selectors';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  productList: ProductInfo[];
  products$ = this.store.pipe(select(selectProducts));
  constructor(private dataService: DataService, private store: Store<any>) {}

  ngOnInit() {
   /*  this.dataService.productList$.subscribe(data => {
      this.productList = data;
    }); */

    this.products$.subscribe(data => {
      this.productList = data;
    })
  }
}
