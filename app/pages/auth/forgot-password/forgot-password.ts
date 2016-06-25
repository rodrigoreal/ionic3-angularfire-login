import {NavController, Loading} from "ionic-angular";
import {AngularFire, AuthProviders, AuthMethods } from "angularfire2";
import {OnInit, Inject, Component} from "@angular/core";
import {LoginEmailPage} from "../login-email/login-email";

@Component({
  templateUrl: "build/pages/auth/forgot-password/forgot-password.html"
})

export class ForgotPasswordPage {
  error: any;

  constructor(private af: AngularFire,
    private navCtrl: NavController) {
  }

  ngOnInit() {

  }

  resetPassword(credentials) {
    let loading = Loading.create({
      content: "Please wait.."
    });
    this.navCtrl.present(loading);

    let ref = this;
    // this.ref.resetPassword({
    //   email: credentials.email
    // }, function(error) {
    //   if (error) {
    //     switch (error.code) {
    //       case "INVALID_USER":
    //         ref.error = "Este usuário não existe.";
    //         break;
    //       default:
    //         ref.error = error;
    //         break;
    //     }
    //     loading.dismiss();
    //   } else {
    //     ref.error = "Em breve você irá receber um e-mail com uma nova senha temporária.";
    //     loading.dismiss();
    //   }
    // });
  }
}
