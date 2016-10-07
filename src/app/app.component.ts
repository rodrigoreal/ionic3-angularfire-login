import { Component, ViewChild} from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/home/home';

import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

@Component({
  template: `<ion-nav></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isAppInitialized: boolean = false;
  user: any;

  constructor(
    private platform: Platform,
    protected data: DataProvider,
    protected auth: AuthProvider) {
    this.user = {
      image: ''
    };
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          this.nav.setRoot(HomePage);
          this.isAppInitialized = true;
        }
        this.user = data;
        this.data.list('pets').subscribe(data => {
          console.log(data);
        });
      }, err => {
        this.nav.setRoot(AuthPage);
      });
      StatusBar.styleDefault();
    });
  }
}
