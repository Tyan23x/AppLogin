import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, from, Observable, of, switchMap } from 'rxjs';
import { Itasks } from '../../interfaces/tasks';
import { User } from '../../interfaces/user';
import { LoadingService } from '../../controllers/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private userId: string = '';

  constructor(
    private readonly firestr: AngularFirestore,
    private readonly authSvr: AuthService,
    private readonly loading: LoadingService

  ) {}

  async addTask(task: Itasks): Promise<void> {
    try {
      this.loading.show()
      const userId = task.userId; // Asegúrate de que estás usando el uid del usuario
      await this.firestr.collection(`users/${userId}/tasks`).add(task);
      this.loading.dismiss()
      console.log('Task successfully added to Firestore!');
      console.log('addtasks', task)
    } catch (error) {
      console.error('Error adding task:', error);
      throw error; // Vuelve a lanzar el error para manejarlo en el componente
    }
  }
  getTasks(): Observable<any[]> {
    return from(this.authSvr.getCurrentUser()).pipe(
      switchMap(user => {
        if (user && user.uid) {
          return this.firestr.collection(`users/${user.uid}/tasks`).snapshotChanges();
        } else {
          return of([]);
        }
      })
    );
  }
}
  // addTask(task: Itasks): Promise<void> { // Asegurarse de que devuelva una promesa
  //   return new Promise((resolve, reject) => {
  //     this.authSvr.getUser().subscribe((user: User | null) => {
  //       if (user) {
  //         const taskId = this.firestr.createId();
  //         const taskWithId = { ...task, userId: user.uid, taskId };
  //         this.firestr.collection(`tasks`).doc(taskId).set(taskWithId)
  //           .then(() => resolve())
  //           .catch(err => reject(err));
  //       } else {
  //         reject('No user logged in');
  //       }
  //     });
  //   });
  // }

//   // Método para obtener todas las tareas del usuario autenticado
//   getTasks() {
//     return this.authSvr.getUser().pipe(
//       switchMap((user: User | null) => {
//         if (user) {
//           return this.firestr.collection(`tasks`, ref => ref.where('userId', '==', user.uid)).snapshotChanges();
//         } else {
//           return of([]);
//         }
//       })
//     );

//   }

//   updateTask(taskId: string, update: Partial<Itasks>): Promise<void> {
//     return this.firestr.collection(`tasks`).doc(taskId).update(update);
//   }

//   deleteTask(taskId: string): Promise<void> {
//     return this.firestr.collection(`tasks`).doc(taskId).delete();
//   }
// }

  //   // Crear nueva tarea 
  //   createTask(task: Itasks): Promise<void> {
  //     const id = this.firestr.createId(); // Genera un nuevo ID
  //     return this.firestr.collection(`users/${this.userId}/tasks`).doc(id).set({ ...task, id }); // Almacena la tarea en Firestore con un nuevo ID
  // }

  //   // Método para eliminar una tarea por ID
  //   deleteTask(taskId: string): Promise<void> {
  //     return this.firestr
  //       .collection(`users/${this.userId}/tasks`)
  //       .doc(taskId)
  //       .delete();
  //   }

  //   // Método para actualizar una tarea
  //   updateTask(task: Itasks): Promise<void> {
  //     return this.firestr
  //       .collection(`users/${this.userId}/tasks`)
  //       .doc(task.userId)
  //       .update(task);