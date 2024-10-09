import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() Title: string = '';
  @Input() Description: string = '';

  // @Input() tasks: { title: string, description: string, done: boolean; }[] = [];

  constructor(private readonly popoverCtrl : PopoverController) { }

  ngOnInit() {}

  async presentPopover(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        options: [
          { label: 'Update', value: 'Update', icon: 'create' },
          { label: 'Delete', value: 'Delete', icon: 'trash' }
        ]
      }
    });
    
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      this.handleOptionSelection(data);
    }
  }

  handleOptionSelection(option: string) {
    //Metodos para cambiar el estado de la tarea.
  }
}