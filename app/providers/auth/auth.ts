import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {Observable} from "rxjs/Observable";
import {Facebook} from 'ionic-native';

@Injectable()
export class AuthProvider {
  constructor(private af: AngularFire) {}

  getUserData() {
    return Observable.create(observer => {
      this.af.auth.subscribe(authData => {
        if (authData) {
          this.af.database.object("/users/" + authData.uid).subscribe(userData => {
            console.log(userData);
            observer.next(userData);
          });
        } else {
          observer.error();
        }
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser(credentials).then(authData => {
        credentials.created = true;
        observer.next(credentials);
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  loginWithFacebook() {
    return Observable.create(observer => {
      let fbLoginSuccess = function (userData) {
        console.log("UserInfo: ", userData);
        facebookConnectPlugin.getAccessToken(function(token) {
          let provider = firebase.auth.FacebookAuthProvider.credential(token);
          firebase.auth().signInWithCredential(provider).then((success) => {
            observer.next(success);
          });
        });
      };

      facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
        function (error) {
          console.error(error);
        }
      );
    });
  }

  loginWithGoogle() {
    return Observable.create(observer => {
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      }).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
