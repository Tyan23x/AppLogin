import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { TaskService } from '../../services/tasks/task.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() Title: string = '';
  @Input() Description: string = '';
  @Input() taskId: string = '';  // Agregar taskId para identificar la tarea
  @Input() done: boolean = false;  // Estado 'done' de la tarea

  // @Input() tasks: { title: string, description: string, done: boolean; }[] = [];


  constructor(
    private readonly popoverCtrl : PopoverController,
    private readonly taskService: TaskService
  ) { }

  ngOnInit() {}

  async presentPopover(ev: Event) {  // Aquí el segundo parámetro será la tarea que se está editando
    const task = { title: this.Title, description: this.Description };  // Puedes ajustar según el objeto de la tarea
  
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'style-Popover',
      event: ev,
      translucent: true,
      componentProps: {
        options: [
          { label: 'Update', value: 'update', icon: 'create' },
          { label: 'Delete', value: 'delete', icon: 'trash' }
        ],
        task: task // Pasamos la tarea al popover
      }
    });
  
    await popover.present();
  
    const { data } = await popover.onDidDismiss();  // Captura la opción y los datos de la tarea
    if (data) {
      this.handleOptionSelection(data.option, data.task);  // Pasa ambos al manejador
    }
  }
  
  handleOptionSelection(option: string, task: any) {
    if (option === 'update') {
      // Lógica para actualizar la tarea específica
      console.log('Update task:', task);
    } else if (option === 'delete') {
      // Lógica para eliminar la tarea específica
      console.log('Delete task:', task);
    }
  }

  async markAsDone() {
    console.log('Task ID:', this.taskId);  // Asegúrate de que taskId tenga un valor
    try {
      await this.taskService.updateTaskStatus(this.taskId, true); // Cambia el estado a 'done'
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }
}