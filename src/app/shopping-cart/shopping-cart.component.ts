import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { selectProducts} from '../state/product.selectors';
import { DataService } from '../services/data.service';
import { ShoppingCartItem, OrderInfo, ProductInfo } from '../interface/ec-template.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  data: ShoppingCartItem[] = [];
  // order summary
  subTotal = 0;
  shippingFee = 50;
  taxPercentage = 5; // 5%
  tax = 0;
  total = 0;
  products$ = this.store.pipe(select(selectProducts));
  prodListList: ProductInfo[];
  constructor(private dataService: DataService, private store: Store<any>) {}

  ngOnInit() {
    this.data = this.dataService.shoppingCartData;
    this.products$.subscribe(prodList => {
      this.prodListList = prodList;
    });
    this.getOrderSummary();
  }

  removeItem(item: ShoppingCartItem) {
    this.dataService.deleteShoppingCartItem(item, this.prodListList);
    this.data = this.dataService.shoppingCartData;
    this.getOrderSummary();
  }

  getTotalPrice(item: ShoppingCartItem) {
    return item.quantity * +item.product.costPrice;
  }

  getOrderSummary() {
    this.subTotal = 0;
    for (const i of this.data) {
      this.subTotal = this.subTotal + +i.product.costPrice * i.quantity;
    }
    this.tax = (this.subTotal * this.taxPercentage) / 100;
    this.total = this.subTotal + this.shippingFee + this.tax;
  }

  onCheckOut() {
    this.dataService.saveOrderInfo(<OrderInfo>{
      items: this.data,
      totalPrice: this.total
    });
  }
}
