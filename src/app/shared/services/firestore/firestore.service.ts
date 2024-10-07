import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private readonly firestore: AngularFirestore) {}

  // Método para guardar datos del formulario en Firestore
  createUserProfile(userId: string, userData: any) {
    return this.firestore
      .collection('users') // Crea una colección 'users' en Firestore
      .doc(userId) // Usa el ID del usuario como referencia del documento
      .set(userData); // Guarda los datos en el documento
  }

  // Método para obtener datos del usuario
  getUserProfile(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  // Método para actualizar datos del usuario
  updateUserProfile(userId: string, userData: any) {
    return this.firestore.collection('users').doc(userId).update(userData);
  }
}