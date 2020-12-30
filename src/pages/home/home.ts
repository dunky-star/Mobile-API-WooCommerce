import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

var WC = require('woocommerce-api');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  WooCommerce: any;

  constructor(public navCtrl: NavController) {

  var WooCommerce = new WC({
  url: 'http://21shop-it.com',
  consumerKey: 'ck_211c5b903b7f2e48f211caebd6ca1dc0d8ecb4ee',
  consumerSecret: 'cs_eb10a011b2d8ea0c3408bb3137ee0ebf3fb5b378',
  version: 'v3'
});

 this.WooCommerce.getAsync("products").then((data: { body: string; }) =>{
      console.log(JSON.parse(data.body));
    }, (err: any) =>{
      console.log(err)
    }

  }

}
