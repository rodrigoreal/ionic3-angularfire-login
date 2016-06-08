import {Page, NavController} from "ionic-angular";
import {FirebaseAuth, FirebaseRef, AuthProviders, AuthMethods } from "angularfire2";
import {OnInit, Inject} from "@angular/core";
import {LoginEmailPage} from "../login-email/login-email";
import {SignUpPage} from "../sign-up/sign-up";
import {TermsOfServicePage} from "../../terms-of-service/terms-of-service";

@Page({
  templateUrl: "build/pages/auth/home/home.html"
})

export class AuthPage {
  error: any;

  constructor(private auth: FirebaseAuth,
    @Inject(FirebaseRef) public ref: Firebase,
    private navCtrl: NavController) {
  }

  ngOnInit() {

  }

  openSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

  openLoginPage() {
    this.navCtrl.push(LoginEmailPage);
  }

  openTermsOfService() {
    this.navCtrl.push(TermsOfServicePage);
  }

  registerUserWithFacebook() {
    this.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then((value) => {
      this.navCtrl.popToRoot();
    }).catch((error) => {
      this.error = error;
    });
  }

  registerUserWithGoogle() {
    this.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then((value) => {
      this.navCtrl.popToRoot();
    }).catch((error) => {
      this.error = error;
    });
  }
}
