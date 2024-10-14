import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, Observable, of } from 'rxjs';
import { Itasks } from '../../interfaces/tasks';
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

  // Método para agregar una tarea
  // async addTask(task: Itasks): Promise<void> {
  //   try {
  //     this.loading.show();
  //     const userId = task.userId; // Asegúrate de que estás usando el uid del usuario
  //     await this.firestr.collection(`users/${userId}/tasks`).add(task);
  //     this.loading.dismiss();
  //     console.log('Task successfully added to Firestore!');
  //   } catch (error) {
  //     console.error('Error adding task:', error);
  //     this.loading.dismiss();
  //     throw error; // Vuelve a lanzar el error para manejarlo en el componente
  //   }
  // }

  async addTask(task: Itasks): Promise<string> {
    try {
      this.loading.show();
      const userId = task.userId; // Asegúrate de que estás usando el uid del usuario
      const docRef = await this.firestr.collection(`users/${userId}/tasks`).add(task);
      this.loading.dismiss();
      console.log('Task successfully added to Firestore!');
      return docRef.id; // Devuelve el ID del documento creado
    } catch (error) {
      console.error('Error adding task:', error);
      this.loading.dismiss();
      throw error; // Vuelve a lanzar el error para manejarlo en el componente
    }
  }

  public async updateTaskStatus(taskId: string, status: boolean): Promise<void> {
    const currentUser = await this.authSvr.getUserData(); // Obtener el usuario actual
    const userId = currentUser?.uid; // Asegúrate de tener el UID del usuario
  
    if (userId) {
      await this.firestr.doc(`users/${userId}/tasks/${taskId}`).update({ done: status }); // Actualiza el campo 'done'
      console.log(`Task ${taskId} updated to done: ${status}`);
    } else {
      throw new Error('User not found'); // Manejo de error si no se encuentra el usuario
    }
  }
  

  // Nuevo método para obtener todas las tareas del usuario
  public getTasksByUserId(userId: string): Observable<Itasks[]> {
    return this.firestr
      .collection<Itasks>(`users/${userId}/tasks`, (ref) =>
        ref.orderBy('date', 'desc') // Puedes ordenar las tareas por fecha si es necesario
      )
      .valueChanges(); // valueChanges devuelve un Observable con las tareas
  }
}