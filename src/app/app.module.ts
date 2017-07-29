import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { FunctionsProvider } from '../providers/functions/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyDcbsUEReGm_dlijVXC1sMCcqKpCsXt0nQ',
  authDomain: 'ionic2-angularfire-login-14ea3.firebaseapp.com',
  databaseURL: 'https://ionic2-angularfire-login-14ea3.firebaseio.com',
  projectId: 'ionic2-angularfire-login-14ea3',
  storageBucket: 'ionic2-angularfire-login-14ea3.appspot.com',
  messagingSenderId: '438127821589'
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    DataProvider,
    FunctionsProvider,
    FunctionsProvider
  ]
})
export class AppModule {}
