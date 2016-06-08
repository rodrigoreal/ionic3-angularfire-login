import {App, IonicApp, Platform} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {HomePage} from "./pages/home/home";

import {FIREBASE_PROVIDERS, defaultFirebase} from "angularfire2";

@App({
  templateUrl: "build/app.html",
  providers: [
    FIREBASE_PROVIDERS,
    defaultFirebase("https://ionic2-angularfire-login.firebaseio.com/")
  ],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

class MyApp {
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(private app: IonicApp, private platform: Platform) {
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
