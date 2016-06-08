import {NavController, Loading} from "ionic-angular";
import {FirebaseAuth, FirebaseRef, AuthProviders, AuthMethods} from "angularfire2";
import {OnInit, Inject, Component} from "@angular/core";
import {LoginEmailPage} from "../login-email/login-email";

@Component({
  templateUrl: "build/pages/auth/sign-up/sign-up.html"
})

export class SignUpPage {
  error: any;

  constructor(private auth: FirebaseAuth,
    @Inject(FirebaseRef) public ref: Firebase,
    private navCtrl: NavController) {
  }

  ngOnInit() {

  }

  openLoginPage(): void {
    this.navCtrl.push(LoginEmailPage);
  }

  registerUser(credentials) {
    let loading = Loading.create({
      content: "Por favor aguarde..."
    });
    this.navCtrl.present(loading);

    this.auth.createUser(credentials).then((authData: FirebaseAuthData) => {
      console.log(authData);
      credentials.created = true;
      return this.login(credentials, loading);
    }).catch((error) => {
      loading.dismiss();
      if (error) {
        switch (error.code) {
          case "INVALID_EMAIL":
            this.error = "E-mail inválido.";
            break;
          case "EMAIL_TAKEN":
            this.error = "Este e-mail já está sendo utilizado.";
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

  login(credentials, loading) {
    this.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      console.log(authData);
      let auth: FirebaseAuthDataPassword = authData.password;
      return this.ref.child("users")
        .child(authData.uid)
        .set({
          "provider": authData.provider,
          "avatar": auth.profileImageURL,
          "displayName": auth.email,
          "authData" : authData
        });
    }).then((value) => {
      loading.dismiss();
      this.navCtrl.popToRoot();
    }).catch((error) => {
      loading.dismiss();
      this.error = error;
      console.log(error);
    });
  }
}
