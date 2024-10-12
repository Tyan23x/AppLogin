import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  constructor(private modalCtrl: ModalController) {}

  public closeModal(option: string) {
    this.modalCtrl.dismiss(option); // Devuelve la opción seleccionada al cerrar el modal
  }
}