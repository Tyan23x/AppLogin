import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { TaskService } from '../../services/tasks/task.service';
import { LoadingService } from '../../controllers/loading/loading.service';
import { AuthService } from '../../services/auths/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Itasks } from '../../interfaces/tasks';
import { Timestamp } from '@firebase/firestore-types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {
  

    @Input() task!: Itasks;

  constructor(
    private readonly popoverCtrl : PopoverController,
    private authService: AuthService,
    private readonly loadingSrv: LoadingService,
    private readonly taskSvr: TaskService,
  ) { }

  ngOnInit() {
  }

  async presentPopover(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'style-Popover',
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

  getFormattedDate(taskDate: Timestamp): Date | null {
    return taskDate ? taskDate.toDate() : null; // Convertir a Date si existe
  }

  handleOptionSelection(option: string) {
    //Metodos para cambiar el estado de la tarea.
  }
}