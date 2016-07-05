import {NavController, Loading} from "ionic-angular";
import {OnInit, Inject, Component} from "@angular/core";
import {LoginEmailPage} from "../login-email/login-email";
import {HomePage} from "../../home/home";
import {AuthProvider} from "../../../providers/auth/auth";

@Component({
  templateUrl: "build/pages/auth/sign-up/sign-up.html"
})

export class SignUpPage {
  error: any;
  constructor(private navCtrl: NavController, private auth: AuthProvider) {}

  ngOnInit() {

  }

  openLoginPage() {
    this.navCtrl.push(LoginEmailPage);
  }

  registerUser(credentials) {
    let loading = Loading.create({
      content: "Please wait..."
    });
    this.navCtrl.present(loading);

    this.auth.registerUser(credentials).subscribe(registerData => {
      this.auth.loginWithEmail(registerData).subscribe(loginData => {
        setTimeout(() => {
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        }, 1000);
      }, loginError => {
        setTimeout(() => {
          loading.dismiss();
          this.error = loginError;
        }, 1000);
      });
    }, registerError => {
      setTimeout(() => {
        loading.dismiss();
        this.error = registerError;
      }, 1000);
    });
  }
}
