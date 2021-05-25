import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ProductInfo,
  CategoryInfo,
  ShoppingCartItem,
  OrderInfo
} from '../interface/ec-template.interface';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

const SHOPPING_CART_KEY = 'shopping-cart-data';
const ORDER_INFO_KEY = 'order-info';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers = new HttpHeaders();

  shoppingCartData: ShoppingCartItem[] = [];

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.initData();
  }

  setHeaders(key: string, value: string) {
    this.headers.set(key, value);
  }

  private initData() {
    
  }

  getProductListFilteredByCategory(productList:ProductInfo[], catagoryName: string): ProductInfo[] {
    if (catagoryName === 'all') {
     return productList; 
    } else {
      return productList.filter(prod => { if (prod.category === catagoryName) return prod} );
    }
  }
  getProductByGivenId(productList:ProductInfo[], prodId: string): ProductInfo {
   return productList.find(prod => prod.id === prodId );
   
  }

  private setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  private removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  private getAllProductList() {
    return this.http.get('./assets/data/product-list.json', { headers: this.headers });
  }

  private getCategoryList() {
    return this.http.get('./assets/data/category-list.json', { headers: this.headers });
  }

  getMenuList() {
    return this.http.get('./assets/data/menu-list.json', { headers: this.headers });
  }

  private loadShoppingCart() {
    if (this.getLocalStorage(SHOPPING_CART_KEY)) {
      this.shoppingCartData = this.getLocalStorage(SHOPPING_CART_KEY);
    }
    console.log('SC Data from LocalStorage', this.shoppingCartData);
  }

  addShoppingCartItemByProdId(item: ShoppingCartItem, prodList:ProductInfo[]) {
    if (
      this.shoppingCartData.find(data => {
        return data.product.id === item.product.id;
      })
    ) {
      for (const i of this.shoppingCartData) {
        if (i.product.id === item.product.id) {
          i.quantity = i.quantity + item.quantity;
        }
      }
    } else {
      let addedShopItem = {}
      this.shoppingCartData = [...this.shoppingCartData, item];
    }
    console.log('item added:', this.shoppingCartData);
    this.setLocalStorage(SHOPPING_CART_KEY, this.shoppingCartData);
    this.notifierService.notify(
      'default',
      `Add ${item.product.name} to cart`
    );
  }

  addShoppingCartItem(item: ShoppingCartItem) {
    if (
      this.shoppingCartData.find(data => {
        return data.product.id === item.product.id;
      })
    ) {
      for (const i of this.shoppingCartData) {
        if (i.product.id === item.product.id) {
          i.quantity = i.quantity + item.quantity;
        }
      }
    } else {
      this.shoppingCartData = [...this.shoppingCartData, item];
    }
    console.log('item added:', this.shoppingCartData);
    this.setLocalStorage(SHOPPING_CART_KEY, this.shoppingCartData);
    this.notifierService.notify(
      'default',
      `Add ${item.product.name} to cart`
    );
  }

  editShoppingCartItem(item: ShoppingCartItem) {
    this.shoppingCartData = this.shoppingCartData.map((data: ShoppingCartItem) => {
      if (data.product.id === item.product.id) {
        data = Object.assign({}, data, item);
      }
      return data;
    });
    console.log('item edited:', this.shoppingCartData);
    this.setLocalStorage(SHOPPING_CART_KEY, this.shoppingCartData);
  }

  deleteShoppingCartItem(item: ShoppingCartItem) {
    this.shoppingCartData = this.shoppingCartData.filter(
      data => !(data.product.id === item.product.id)
    );
    console.log('item removed:', this.shoppingCartData);
    this.setLocalStorage(SHOPPING_CART_KEY, this.shoppingCartData);
    this.notifierService.notify(
      'warning',
      `Remove ${item.product.name}`
    );
  }

  saveOrderInfo(data: OrderInfo) {
    this.setLocalStorage(ORDER_INFO_KEY, data);
  }

  getOrderInfo() {
    return this.getLocalStorage(ORDER_INFO_KEY);
  }

  submitOrder(order: OrderInfo) {
    console.log('Order Info:', order);
    this.notifierService.notify('default', 'Submit Success');
    // Delete shopping cart items and order from local storage then redirect to shopping Cart
    this.removeLocalStorage(SHOPPING_CART_KEY);
    this.removeLocalStorage(ORDER_INFO_KEY);
    this.shoppingCartData = [];
    setTimeout(() => {
      this.router.navigate(['shopping-cart']);
    }, 2000);
  }
}
