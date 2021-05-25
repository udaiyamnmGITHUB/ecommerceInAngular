import {
  ProductInfo,
  CategoryInfo,
  ShoppingCartItem,
  OrderInfo
} from '../interface/ec-template.interface';

export interface ProductState {
  products: ReadonlyArray<ProductInfo>;
}
