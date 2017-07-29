import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthProvider } from '../../../providers/auth/auth';

@IonicPage({
  name: 'auth-password'
})
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class Password {
  form : FormGroup;
  hasError: boolean;
  errorMessage: string;
  emailSent: boolean;
  
  constructor(
    private navCtrl: NavController, 
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private auth: AuthProvider
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  signInWithEmail() {
    const loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });
    loading.present();

    this.auth.sendPasswordResetEmail(this.form.value.email).then(() => {
      loading.dismiss();
      this.hasError = false;
      this.emailSent = true;
    }, (error) => {
      loading.dismiss();
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = 'Insira um email válido.';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'Nenhum usuário com este email encontrado.';
          break;
        default:
          this.errorMessage = error;
          break;
      }
      this.hasError = true;
    });
  }

  navigatePop() {
    this.navCtrl.pop();
  }
}
