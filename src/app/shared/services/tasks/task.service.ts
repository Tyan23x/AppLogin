import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { catchError, from, map, Observable, of, switchMap, timestamp } from 'rxjs';
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

  convertTimestampToDate(task: any): any {
    if (task.date && task.date instanceof timestamp) {
      task.date = task.date.toDate();
    }
    return task;
  }

  getTasks(): Observable<DocumentChangeAction<unknown>[]> {
    const currentUser = this.authSvr.getCurrentUser();
    return new Observable((observer) => {
      currentUser.then((user) => {
        if (user) {
          const tasksObservable = this.firestr.collection(`users/${user.uid}/tasks`).snapshotChanges();
          tasksObservable.subscribe(observer);
        } else {
          observer.error('No user is authenticated');
        }
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  async addTask(task: Itasks): Promise<DocumentReference<unknown> | undefined> {
    const currentUser = await this.authSvr.getCurrentUser(); // Obtener el usuario actual

    if (!currentUser) {
      console.error('No user is authenticated');
      return undefined; // Devuelve undefined si no hay usuario autenticado
    }

    try {
      const docRef = await this.firestr.collection(`users/${currentUser.uid}/tasks`).add(task);
      console.log('Task added with ID:', docRef.id);
      return docRef; // Devuelve la referencia del documento
    } catch (error) {
      console.error('Error adding task:', error);
      return undefined; // Devuelve undefined en caso de error
    }
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