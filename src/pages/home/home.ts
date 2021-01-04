import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

declare var require: any;

var WC = require('woocommerce-api')

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  [x: string]: any;
  WooCommerce: any;
  moreProducts: any[];
  page: number;
  searchQuery: string = "";
  wc: any;
  products: any[];



  @ViewChild('productSlides') productSlides: Slides;


  constructor(public navCtrl: NavController) {

     this.page = 2;

    this.wc = WC({
      url: 'https://full-dress-objectiv.000webhostapp.com',
      consumerKey: 'ck_209a15b6e5c396d21ee717cc460e604293836270',
      consumerSecret: 'cs_2887b6d78228e67b1e1d2cca83c0f321d9076abc'
    });



    this.wc.getAsync("products").then( (data: any) =>{
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err: any) =>{
      console.log(err)
    });

    this.loadMoreProducts();
  }

  ionViewDidLoad(){
      setInterval(()=>{
        if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
          this.productSlides.slideTo(0);

        this.productSlides.slideNext();
      }, 3000);
  };

  loadMoreProducts(){
     this.wc.getAsync("products?page=" + this.page).then( (data: any) =>{
      console.log(JSON.parse(data.body));
      this.moreProducts = JSON.parse(data.body).products;
    }, (err: any) =>{
      console.log(err)
    });

  }

}
