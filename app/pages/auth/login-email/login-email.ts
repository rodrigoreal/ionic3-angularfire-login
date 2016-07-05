import {NavController, Loading} from "ionic-angular";
import {OnInit, Component} from "@angular/core";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {SignUpPage} from "../sign-up/sign-up";
import {HomePage} from "../../home/home";
import {AuthProvider} from "../../../providers/auth/auth";

@Component({
  templateUrl: "build/pages/auth/login-email/login-email.html"
})

export class LoginEmailPage {
  error: any;

  constructor(private navCtrl: NavController, private auth: AuthProvider) {}

  ngOnInit() {

  }

  openForgotPasswordPage(): void {
    this.navCtrl.push(ForgotPasswordPage);
  }

  openSignUpPage(): void {
    this.navCtrl.push(SignUpPage);
  }

  login(credentials) {
    let loading = Loading.create({
      content: "Please wait..."
    });
    this.navCtrl.present(loading);

    this.auth.loginWithEmail(credentials).subscribe(data => {
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.error = err;
      }, 1000);
    });
  }
}
