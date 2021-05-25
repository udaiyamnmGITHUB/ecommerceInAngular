import { createReducer, on, Action } from '@ngrx/store';
import { ProductInfo } from '../interface/ec-template.interface';

import { retrievedProductList } from './product.actions';

export const initialState: ReadonlyArray<ProductInfo> = [];

export const productsReducer = createReducer(
  initialState,
  on(retrievedProductList, (state, { ProductInfo }) => [...ProductInfo])
);
