import {NavController, Modal} from "ionic-angular";
import {AngularFire, FirebaseListObservable} from "angularfire2";
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
    private af: AngularFire) {
  }

  ngOnInit() {
    this.bookItems = this.af.database.list("/monsters");

    this.af.auth.subscribe(data => {
      if (data) {
        this.authInfo = data;
      } else {
        this.authInfo = null;
        this.showLoginModal();
      }
    });
  }

  logout() {
    if (this.authInfo) {
      this.af.auth.logout();
      return;
    }
  }

  showLoginModal() {
    let loginPage = Modal.create(AuthPage);
    this.navCtrl.present(loginPage);
  }
}
