import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private readonly loadingCtrl: LoadingController) { }

  public async show() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...', 
      spinner: 'bubbles', 
      cssClass: 'custom-loading', 
    });
    await loading.present();
  }

  public async dismiss() {
    await this.loadingCtrl.dismiss();
  }
}