import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private readonly toastCtrl: ToastController) { }

  async presentToast(message: string, success: boolean, duration: number = 2000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: success ? 'success' : 'danger', // Cambia el color según el estado de éxito o error
      icon: success ? 'checkmark-circle' : 'close-circle', // Opcional: Ícono según el estado
      position: 'bottom', // Cambiar la posicion de ser necesario.
    });
    toast.present();
  }
}