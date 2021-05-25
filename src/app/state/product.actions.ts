import { createAction, props } from '@ngrx/store';
import { ProductInfo } from '../interface/ec-template.interface';

export const addShoppingCart = createAction(
  '[Prodcut List] Add Product',
  props<{ productId }>()
);

export const removeShoppingCart = createAction(
  '[Prodcut List] Remove Product',
  props<{ productId }>()
);

export const retrievedProductList = createAction(
  '[Prodcut List] Retrived success',
  props< {ProductInfo: ProductInfo[]}>()
);
