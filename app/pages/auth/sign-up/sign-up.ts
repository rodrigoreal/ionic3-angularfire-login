import {NavController, Loading} from "ionic-angular";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {OnInit, Inject, Component} from "@angular/core";
import {LoginEmailPage} from "../login-email/login-email";
import {HomePage} from "../../home/home";

@Component({
  templateUrl: "build/pages/auth/sign-up/sign-up.html"
})

export class SignUpPage {
  error: any;

  constructor(private af: AngularFire,
    private navCtrl: NavController) {
  }

  ngOnInit() {

  }

  openLoginPage(): void {
    this.navCtrl.push(LoginEmailPage);
  }

  registerUser(credentials) {
    let loading = Loading.create({
      content: "Please wait..."
    });
    this.navCtrl.present(loading);

    this.af.auth.createUser(credentials).then((authData: FirebaseAuthData) => {
      console.log(authData);
      credentials.created = true;
      return this.login(credentials, loading);
    }).catch((error) => {
      loading.dismiss();
      if (error) {
        switch (error.code) {
          case "INVALID_EMAIL":
            this.error = "Invalid email.";
            break;
          case "EMAIL_TAKEN":
            this.error = "The specified email address is already in use.";
            break;
          case "NETWORK_ERROR":
            this.error = "An error occurred while attempting to contact the authentication server.";
            break;
          default:
            this.error = error;
        }
      }
    });
  }

  login(credentials, loading) {
    this.af.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      console.log(authData);
      loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      loading.dismiss();
      this.error = error;
      console.log(error);
    });
  }
}
