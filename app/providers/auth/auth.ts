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

  loginWithGoogleUsingPopupFirebase() {
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

  loginWithGoogleUsingPlugin() {
    return Observable.create(observer => {
      // note for iOS the googleplus plugin requires ENABLE_BITCODE to be turned off in the Xcode
      window.plugins.googleplus.login(
          {
            'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': '_google_client_app_id_.apps.googleusercontent.com',
            'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
          },
          function (authData) {
            console.log('got google auth data:', JSON.stringify(authData, null, 2));
            let provider = firebase.auth.GoogleAuthProvider.credential(authData.idToken, authData.accessToken);
            firebase.auth().signInWithCredential(provider).then((success) => {
              console.log('success!', JSON.stringify(success, null, 2));
              observer.next(success);
            }, (error) => {
              console.log('error', JSON.stringify(error, null, 2))
            });
          },
          function (msg) {
            this.error = msg;
          }
      );
    });
  }

  loginWithGoogleUsingWeb() {
    return Observable.create(observer => {
      this.googleWebLogin(tokenData => {
          console.log('got google auth data:', JSON.stringify(tokenData, null, 2));
          // note the underscore_here vs camelCase for google plus oauth plugin
          let provider = firebase.auth.GoogleAuthProvider.credential(tokenData.id_token, tokenData.access_toekn);
          firebase.auth().signInWithCredential(provider).then((success) => {
            console.log('success!', JSON.stringify(success, null, 2));
            observer.next(success);
          }, (error) => {
            console.log('error', JSON.stringify(error, null, 2))
          });
      });
    });
  }

  // based on https://forum.ionicframework.com/t/how-to-implement-google-oauth-in-an-ionic-2-app/47038/6
  googleWebLogin(onSuccess: Function) {
    console.log('trying google pure web login...');
    // build authUrl:

    let nonce = (Math.random().toString(36) + '00000').slice(-5);
    let authBase = 'https://accounts.google.com/o/oauth2/v2/auth';

    let redirect_uri = window.location.origin;
    let appFromFile = false;
    if (redirect_uri.indexOf('file://') == 0) {
      appFromFile = true;
      redirect_uri = 'http://localhost/callback';
    }

    let authParams = {
      response_type: 'id_token token', // Firebase require both - id_token token
      nonce: nonce, // required for id_token - then should be verifued
      client_id: '_google_client_app_id_.apps.googleusercontent.com',

      redirect_uri: redirect_uri,
      remember: 'none',
      scope: [ 'email', 'openid', 'profile' ].join(' ')
    };
    let params = [];
    for (let k in authParams) {
      params.push(k + '=' + authParams[k]);
    }
    let authUrl = authBase + '?' + params.join('&');

    console.log('authUrl', authUrl);
    let ref = window.open(authUrl, '_blank');

    // NOTE for '_self' to work with i.e. ionic serve - dedicatated handler is required as there app will be fully reloaded
    // let ref = window.open(authUrl, appFromFile?'_blank':'_self'); // _blank is required for the redired_uri to work

    ref.addEventListener('loadstart', (event: any) => {
      console.log('loadstart for', event.url);
      if((event.url).startsWith(redirect_uri)) {
        ref.close();
        let response = (event.url).split("#")[1];
        console.debug('oauth response: ' + response)
        onSuccess(this.parseGoogleToken(response));
      }
    });
  }

  parseGoogleToken(hash: string) {
    let token = {
      created: new Date().getTime()
    };
    let parms = hash.split('&');
    for (let i in parms) {
      let kv = parms[i].split('=');
      token[kv[0]] = kv[1];
    }
    return token;
  }

  logout() {
    this.af.auth.logout();
  }
}
