import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ProductInfo } from 'src/app/interface/ec-template.interface';
import { Store, select } from '@ngrx/store';

import { selectProducts} from '../../state/product.selectors';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  filteredProductList: ProductInfo[] = [];
  products$ = this.store.pipe(select(selectProducts));
  constructor(private route: ActivatedRoute, public dataService: DataService, private store: Store<any>) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.products$.subscribe(data => {
        this.filteredProductList = this.dataService.getProductListFilteredByCategory(data, params['category']);
      });
    });
  }
}
