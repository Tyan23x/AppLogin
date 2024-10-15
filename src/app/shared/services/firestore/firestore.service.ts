import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private readonly firestore: AngularFirestore) {}

  // Método para guardar datos del formulario en Firestore
  public createUserProfile(userId: string, userData: any): Promise<void> {
    return this.firestore.collection('users').doc(userId).set({
      ...userData,
      uid: userId,  // Agregar el UID al documento
    });
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