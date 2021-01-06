import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
// import { ProductDetails } from '../product-details/product-details';

@IonicPage({})
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategory {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider) {

    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data: { body: string; }) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err: any) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategory');
  }

  loadMoreProducts(event: { complete: () => void; enable: (arg0: boolean) => void; }) {
    this.page++;
    console.log("Getting page " + this.page);
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data: { body: string; }) => {
      let temp = (JSON.parse(data.body).products);

      this.products = this.products.concat(JSON.parse(data.body).products)
      console.log(this.products);
      event.complete();

      if (temp.length < 10)
        event.enable(false);
    })
  }

  openProductPage(product: any){
    this.navCtrl.push('ProductDetails', {"product": product} );
  }

}
