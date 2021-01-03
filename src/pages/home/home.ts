import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var require: any;

var WC = require('woocommerce-api')

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  wc: any;
  products: any[];

  constructor(public navCtrl: NavController) {

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


  }

}
