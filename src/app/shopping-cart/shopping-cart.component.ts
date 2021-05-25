import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { selectProducts } from '../state/product.selectors';
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
  shippingFee = 0;
  total = 0;
  discount = 0;
  products$ = this.store.pipe(select(selectProducts));
  prodListList: ProductInfo[];
  isVoucherApplied: boolean = false;
  constructor(private dataService: DataService, private store: Store<any>) { }

  ngOnInit() {
    this.data = this.dataService.shoppingCartData;
    this.products$.subscribe(prodList => {
      this.prodListList = prodList;
    });
    this.getOrderSummary(0);
  }

  removeItem(item: ShoppingCartItem) {
    this.dataService.deleteShoppingCartItem(item, this.prodListList);
    this.data = this.dataService.shoppingCartData;
    this.getOrderSummary(0);
  }

  getTotalPrice(item: ShoppingCartItem) {
    let totalPrice = item.quantity * +item.product.costPrice;
    return Math.round(totalPrice * 100) / 100;
  }

  applyDiscount(voucherCode: string) {
    switch (voucherCode) {
      case "BOH232":
        {
          let discountCanBeApplied = 5;
          this.getOrderSummary(discountCanBeApplied);
          this.dataService.coupenApplied();
        }
      case "BOH233":
        {
          /* yet to implement */
        }

      case "BOH234":
        {
          /* yet to implement */
        }
    }
  }

  getOrderSummary(discount: number) {
    this.subTotal = 0;
    for (const i of this.data) {
      this.subTotal = this.subTotal + +i.product.costPrice * i.quantity;
    }
    this.total = this.subTotal + this.shippingFee;
    if (discount) {
      this.discount = discount;
      this.isVoucherApplied = true;
      this.total = this.total - discount;
    }
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  onCheckOut() {
    /* to payment module */
  }
}
