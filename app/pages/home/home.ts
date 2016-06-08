import {NavController, Modal} from "ionic-angular";
import {AngularFire, FirebaseAuth, FirebaseListObservable} from "angularfire2";
import {Observable} from "rxjs/Observable";
import {OnInit, Inject, Component} from "@angular/core";
import {AuthPage} from "../auth/home/home";

@Component({
  templateUrl: "build/pages/home/home.html"
})

export class HomePage {
  bookItems: FirebaseListObservable<any[]>;
  authInfo: any;

  constructor(private navCtrl: NavController,
    private af: AngularFire,
    private auth: FirebaseAuth) {
  }

  ngOnInit() {
    this.bookItems = this.af.database.list("/monsters");

    this.auth.subscribe(data => {
      if (data) {
        if (data.facebook) {
          this.authInfo = data.facebook;
          this.authInfo.displayName = data.facebook.displayName;
        } else if (data.google) {
          this.authInfo = data.google;
          this.authInfo.displayName = data.google.displayName;
        } else {
          this.authInfo = data.password;
          this.authInfo.displayName = data.password.email;
        }
      } else {
        this.authInfo = null;
        this.showLoginModal();
      }
    });
  }

  logout() {
    if (this.authInfo && (this.authInfo.email ||  this.authInfo.accessToken)) {
      this.auth.logout();
      return;
    }
  }

  showLoginModal() {
    let loginPage = Modal.create(AuthPage);
    this.navCtrl.present(loginPage);
  }
}
