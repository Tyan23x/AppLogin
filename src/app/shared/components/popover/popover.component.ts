import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  @Input() options: { label: string, value: string, icon: string }[] = [];
  @Input() task: any;  // Recibe la tarea desde el componente padre

  constructor(private popoverCtrl: PopoverController) {}

  public onOptionClick(option: string) {
    this.popoverCtrl.dismiss({ option, task: this.task });  // Devuelve la opción seleccionada y la tarea
  }
}
