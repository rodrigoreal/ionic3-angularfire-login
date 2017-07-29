import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {}
}
