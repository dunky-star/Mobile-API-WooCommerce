import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV2: any;

  constructor() {
    this.Woocommerce = WC({
      url: "https://full-dress-objectiv.000webhostapp.com",
      consumerKey: "ck_209a15b6e5c396d21ee717cc460e604293836270",
      consumerSecret: "cs_2887b6d78228e67b1e1d2cca83c0f321d9076abc"
    });

    this.WoocommerceV2 = WC({
      url: "https://full-dress-objectiv.000webhostapp.com",
      consumerKey: "ck_209a15b6e5c396d21ee717cc460e604293836270",
      consumerSecret: "cs_2887b6d78228e67b1e1d2cca83c0f321d9076abc",
      wpAPI: true,
      version: "wc/v2"
    });
  }

  init(v2?: boolean){
    if(v2 == true){
      return this.WoocommerceV2;
    } else {
      return this.Woocommerce;
    }
  }

}
