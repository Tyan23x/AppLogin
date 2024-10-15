import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { TaskService } from 'src/app/shared/services/tasks/task.service';
import { Itasks } from 'src/app/shared/interfaces/tasks';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public title!: FormControl;
  public description!: FormControl;
  public taskForm!: FormGroup;

  public tasks: Itasks[] = []; // Array de tareas

  constructor(
    private readonly navCtrl: NavController,
    private authService: AuthService,
    private readonly taskService: TaskService,
    private readonly modalCtrl: ModalController,
    private readonly loadingSrv: LoadingService,
    private readonly router: Router
  ) {
    this.initForm();
  }

    async openSettingsModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      cssClass: 'settings-modal',
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data === 'updateProfile') {
      this.goToUpdateProfile();
    } else if (data === 'logOut') {
      this.LogOut();
    }
  }

    public goToUpdateProfile() {
    this.authService.getUserData().then((user) => {
      if (user) {
        const userId = user.uid;
        this.router.navigate([`/update/${userId}`]);  // Redirigir a la página de actualización con el UID en la URL
      }
    });
  }

    public async LogOut() {
    this.loadingSrv.show('Log out...');
    await this.authService.logOut();
    this.loadingSrv.dismiss();
  }

  ngOnInit() {
    this.loadTasks(); // Cargar las tareas al inicializar la página
  }

  // Método para cargar tareas desde Firestore
  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks: Itasks[]) => {
        this.tasks = tasks;  // Asignar las tareas a la propiedad del componente
        console.log('Tareas cargadas:', this.tasks);
      },
      error: (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    });
  }
  
  private initForm() {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.description = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]);

    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description,
    });
  }

  public async addTask() {
    if (this.taskForm.valid) {
      const currentUser = await this.authService.getUserData();
  
      const task: Itasks = {
        userId: currentUser?.uid || '', // Esto se genera automáticamente por Firestore
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        date: new Date(), // Asegúrate de que sea de tipo Date
        done: false, // Valor inicial para 'done'
      };
  
      try {
        await this.taskService.addTask(task);
        console.log('Task added:', task);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  }

}







// import { AuthService } from 'src/app/shared/services/auths/auth.service';
// import { Component, Input, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ModalController, NavController, PopoverController } from '@ionic/angular';
// import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';
// import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
// import { TaskService } from 'src/app/shared/services/tasks/task.service';
// import { Itasks } from 'src/app/shared/interfaces/tasks';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {
//   public title!: FormControl;
//   public description!: FormControl;
//   public id: string = '';

//   public taskForm!: FormGroup;

//   @Input() tasks: {
//     title: string;
//     description: string;
//     date: Date;
//     done: boolean;
//   }[] = [];

//   constructor(
//     private readonly navCtrl: NavController, 
//     private authService: AuthService,
//     private readonly taskService: TaskService,
//     private readonly modalCtrl: ModalController,
//     private readonly loadingSrv: LoadingService,
//     private readonly router: Router
//   ) {
//     this.initForm();
//   }

//   async openSettingsModal() {
//     const modal = await this.modalCtrl.create({
//       component: ModalComponent,
//       cssClass: 'settings-modal',
//     });

//     await modal.present();

//     const { data } = await modal.onDidDismiss();
//     if (data === 'updateProfile') {
//       this.goToUpdateProfile();
//     } else if (data === 'logOut') {
//       this.LogOut();
//     }
//   }

//   public async LogOut() {
//     this.loadingSrv.show('Log out...');
//     await this.authService.logOut();
//     this.loadingSrv.dismiss();
//   }

//   public goToUpdateProfile() {
//     this.authService.getUserData().then((user) => {
//       if (user) {
//         const userId = user.uid;
//         this.router.navigate([`/update/${userId}`]);  // Redirigir a la página de actualización con el UID en la URL
//       }
//     });
//   }

//   private initForm() {
//     this.title = new FormControl('', [
//       Validators.required,
//       Validators.minLength(3),
//     ]);
//     this.description = new FormControl('', [
//       Validators.required,
//       Validators.minLength(10),
//     ]);

//     this.taskForm = new FormGroup({
//       title: this.title,
//       description: this.description,
//     });
//   }
  
//   public async addTask() {
//     if (this.taskForm.valid) {
//       const currentUser = await this.authService.getUserData();
  
//       const tasks: Itasks = {
//         userId: currentUser?.uid || '', // Esto se genera automáticamente por Firestore, puedes dejarlo vacío
//         title: this.taskForm.value.title,
//         description: this.taskForm.value.description,
//         date: new Date(), // Asegúrate de que sea de tipo Date
//         done: false, // El valor inicial para done
//       };
  
//       console.log('Current User:', currentUser); // Verifica el usuario actual
//       console.log('Task to add:', tasks); // Verifica la tarea que se va a agregar
  
//       try {
//         await this.taskService.addTask(tasks);
//         console.log('Task added:', tasks);
//       } catch (error) {
//         console.error('Error adding task:', error);
//       }
//     }
//   }
// }