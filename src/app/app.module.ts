import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { FormsModule } from '@angular/forms';

// Pages
import { ForgotPasswordPage } from '../pages/auth/forgot-password/forgot-password';
import { AuthPage } from '../pages/auth/home/home';
import { LoginEmailPage } from '../pages/auth/login-email/login-email';
import { SignUpPage } from '../pages/auth/sign-up/sign-up';
import { HomePage } from '../pages/home/home';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';

import { AngularFireModule } from 'angularfire2';

// Providers
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyDcbsUEReGm_dlijVXC1sMCcqKpCsXt0nQ',
  authDomain: 'ionic2-angularfire-login-14ea3.firebaseapp.com',
  databaseURL: 'https://ionic2-angularfire-login-14ea3.firebaseio.com',
  storageBucket: 'ionic2-angularfire-login-14ea3.appspot.com',
};

@NgModule({
  declarations: [
    MyApp,
    ForgotPasswordPage,
    AuthPage,
    LoginEmailPage,
    SignUpPage,
    HomePage,
    TermsOfServicePage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ForgotPasswordPage,
    AuthPage,
    LoginEmailPage,
    SignUpPage,
    HomePage,
    TermsOfServicePage
  ],
  providers: [
    DataProvider,
    AuthProvider
  ]
})
export class AppModule {}
