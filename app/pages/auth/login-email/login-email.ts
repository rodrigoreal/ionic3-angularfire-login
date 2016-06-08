import {NavController, Loading} from "ionic-angular";
import {FirebaseAuth, AuthProviders, AuthMethods } from "angularfire2";
import {OnInit, Inject, Component} from "@angular/core";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {SignUpPage} from "../sign-up/sign-up";

@Component({
  templateUrl: "build/pages/auth/login-email/login-email.html"
})

export class LoginEmailPage {
  error: any;

  constructor(private auth: FirebaseAuth,
    private navCtrl: NavController) {
  }

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
      content: "Por favor aguarde..."
    });
    this.navCtrl.present(loading);

    this.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      console.log(authData);
      loading.dismiss();
      this.navCtrl.popToRoot();
    }).catch((error) => {
      loading.dismiss();
      if (error) {
        switch (error.code) {
          case "INVALID_EMAIL":
            this.error = "E-mail inválido.";
            break;
          case "INVALID_USER":
            this.error = "E-mail ou senha incorretos.";
            break;
          case "INVALID_PASSWORD":
            this.error = "E-mail ou senha incorretos.";
            break;
          case "NETWORK_ERROR":
            this.error = "Aconteceu algum erro ao tentar se conectar ao servidor, tente novamente mais tarde.";
            break;
          default:
            this.error = error;
        }
      }
    });
  }
}
