import {Nav, Platform, ionicBootstrap} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {HomePage} from "./pages/home/home";
import {Component, ViewChild} from "@angular/core";

import {FIREBASE_PROVIDERS, defaultFirebase} from "angularfire2";

@Component({
  templateUrl: "build/app.html",
})

class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: "Home", component: HomePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [FIREBASE_PROVIDERS, defaultFirebase({
    apiKey: "AIzaSyDcbsUEReGm_dlijVXC1sMCcqKpCsXt0nQ",
    authDomain: "ionic2-angularfire-login-14ea3.firebaseapp.com",
    databaseURL: "https://ionic2-angularfire-login-14ea3.firebaseio.com",
    storageBucket: "ionic2-angularfire-login-14ea3.appspot.com",
  })], {
});
