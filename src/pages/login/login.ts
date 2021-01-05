import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';;
import { Storage } from '@ionic/storage';

@IonicPage({})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController, public events: Events) {

    this.username = "";
    this.password = "";

  }

  login(){

    this.http.get("https://full-dress-objectiv.000webhostapp.com/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
    .subscribe( (res: { json: () => any; }) => {
      console.log(res.json());

      let response = res.json();

      if(response.error){
        this.toastCtrl.create({
          message: response.error,
          duration: 5000
        }).present();
        return;
      }


      this.storage.set("userLoginInfo", response).then( (data) =>{

        this.alertCtrl.create({
          title: "Login Successful",
          message: "You have been logged in successfully.",
          buttons: [{
            text: "OK",
            handler: () => {

              this.events.publish("updateMenu");

              if(this.navParams.get("next")){
                this.navCtrl.push(this.navParams.get("next"));
              } else {
                this.navCtrl.pop();
              }
            }
          }]
        }).present();


      })




    });


  }

}
