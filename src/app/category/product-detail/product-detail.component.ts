import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ProductInfo } from 'src/app/interface/ec-template.interface';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownItem } from 'src/app/interface/universal.interface';

import { Store, select } from '@ngrx/store';

import { selectProducts} from '../../state/product.selectors';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  selectedProduct: ProductInfo;
  quantity = 1;
  option = <DropdownItem>{};
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  products$ = this.store.pipe(select(selectProducts));
  prodListList: ProductInfo[];

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private store: Store<any>) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.products$.subscribe(prodList => {
        this.prodListList = prodList;
        this.selectedProduct = this.dataService.getProductByGivenId(prodList, params['id']);
      });
      this.option = this.selectedProduct.options[0];
      this.scrollToTop();

      this.galleryImages = [];
      // insert main image
      this.galleryImages.push({ small: this.selectedProduct.img, medium: this.selectedProduct.img, big: this.selectedProduct.img });
      // insert gallery images
      for (const img of this.selectedProduct.gallery) {
        this.galleryImages.push({ small: img, medium: img, big: img });
      }
    });

    this.galleryOptions = [
      // RWD settings
      {
        width: '100%',
        height: '300px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 768,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  quantityOnChange(event: number) {
    console.log('quantity value', event);
    this.quantity = event;
  }

  addToCart() {
    this.dataService.addShoppingCartItemByProdId({
      product: this.selectedProduct,
      quantity: this.quantity,
      option: this.option
    }, this.prodListList);
     this.router.navigateByUrl("/shopping-cart");
  }

  scrollToTop() {
    window.scroll(0, 0);
  }
}
