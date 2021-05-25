import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    ProductInfo,
    CategoryInfo,
    ShoppingCartItem,
    OrderInfo
  } from '../interface/ec-template.interface';

@Injectable({ providedIn: 'root' })
export class ProductDataService {
  constructor(private http: HttpClient) {}

  getAllProductList(): Observable<Array<ProductInfo>> {
    return this.http
      .get<ProductInfo[]>(
        './assets/data/product-list.json'
      ).pipe(map(products => products || []));;
  }
}
