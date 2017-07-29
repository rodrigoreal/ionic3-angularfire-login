import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Password } from './password';

@NgModule({
  declarations: [
    Password,
  ],
  imports: [
    IonicPageModule.forChild(Password),
  ],
  exports: [
    Password
  ]
})
export class PasswordModule {}
