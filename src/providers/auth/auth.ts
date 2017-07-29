import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { DataProvider } from '../data/data';
import { FunctionsProvider } from '../functions/functions';

@Injectable()
export class AuthProvider {
  public user: Observable<firebase.User>;

  constructor(
    private platform: Platform,
    private facebook: Facebook,
    private loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    private data: DataProvider,
    private functions: FunctionsProvider
  ) {
    this.user = afAuth.authState;
  }

  createUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
        this.functions.post('users', {}).subscribe(() => {
          resolve();
        });
      }, (error) => {
        reject(error);
      });
    });
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  signInWithFacebook(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.facebook.login(['email', 'public_profile', 'user_friends'])
        .then((facebookData: FacebookLoginResponse) => {
          const loading = this.loadingCtrl.create({
            content: 'Por favor, aguarde...'
          });
          loading.present();
          const credential = firebase.auth.FacebookAuthProvider
            .credential(facebookData.authResponse.accessToken);
          firebase.auth().signInWithCredential(credential).then((firebaseData) => {
            setTimeout(() => {
              this.functions.post('users', {
                facebook: facebookData.authResponse.userID
              }).subscribe((response) => {
                loading.dismiss();
                resolve();
              }, (error) => {
                loading.dismiss();
                reject(error);
              });
            }, 800);
          });
        }, (error) => {
          resolve(error);
        });
      }
    });
  }

  linkAccountWithFacebook(): Promise<any> {
    return Observable.create((observer) => {
      if (this.platform.is('cordova')) {
        this.facebook.login(['email', 'public_profile', 'user_friends'])
        .then((facebookData: FacebookLoginResponse) => {
          const credential = firebase.auth.FacebookAuthProvider
            .credential(facebookData.authResponse.accessToken);
          firebase.auth().currentUser.linkWithCredential(credential).then((user) => {
            this.data.update(`users/${user.uid}`, {
              facebook: facebookData.authResponse.userID
            }).then(() => {
              observer.next();
            }, (error) => {
              observer.error(error);
            });
          });
        });
      }
    });
  }

  sendPasswordResetEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }
}
