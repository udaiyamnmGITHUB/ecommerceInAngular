import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductInfo } from '../interface/ec-template.interface';
import { ProductState } from './product-state';

export const selectProducts = createSelector(
  (state: ProductState) => state.products,
  (products: Array<ProductInfo>) => products
);

