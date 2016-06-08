import {App, Platform, ionicBootstrap} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {HomePage} from "./pages/home/home";
import {Component} from "@angular/core";

import {FIREBASE_PROVIDERS, defaultFirebase} from "angularfire2";

@Component({
  templateUrl: "build/app.html",
})

class MyApp {
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(private app: App, private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
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
    // Reset the content nav to have just this page
    // we wouldn"t want the back button to show in this scenario
    let nav = this.app.getComponent("nav");
    nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [FIREBASE_PROVIDERS, defaultFirebase("https://ionic2-angularfire-login.firebaseio.com/")], {

});
