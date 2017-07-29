import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Signin } from './signin';

@NgModule({
  declarations: [
    Signin,
  ],
  imports: [
    IonicPageModule.forChild(Signin),
  ],
  exports: [
    Signin
  ]
})
export class SigninModule {}
