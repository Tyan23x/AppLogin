import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private firestoreService: FirestoreService  // Inyecta el servicio Firestore
  ) {
    //comprueba estado de auth
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('auth_token', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('auth_token');
      }
    });
  }

  //Ingresar
  async logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User registered:', userCredential);
        this.userData = userCredential.user;
        localStorage.setItem('auth_token', JSON.stringify(this.userData)); // Actualiza el token
        this.observeUserState();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  //Verifica si el usuario está logueado
  public isLogged(): boolean {
    const user = JSON.parse(localStorage.getItem('auth_token')!);
    return user !== null && user !== 'null';
  }

  async signUpWithEmailAndPassword(email: string, password: string, userData: any) {
    return this.firebaseAuthenticationService
      .createUserWithEmailAndPassword(email, password)
      .then(async(userCredential) => {
        this.userData = userCredential.user;
        const uid = userCredential.user?.uid;
        if (uid) {
          // Guardar en Firestore con el UID
          await this.firestoreService.createUserProfile(uid, userData);
          console.log('User registered and profile saved');
        }
        console.log(
          '🚀 ~ AuthService ~ .then ~ userCredential:',
          userCredential
        );
        this.ngZone.run(() => this.router.navigate(['login']));
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  //Observa el estado del usuario
  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      if (userState) {
        this.ngZone.run(() => this.router.navigate(['home']));
      }
    });
  }

  //Eliminar un usuario
  async deleteUser() {
    try {
      const user = await this.firebaseAuthenticationService.currentUser;
      if (user) {
        await user.delete();
        console.log('The user has been deleted');
      } else {
        throw new Error('No authenticated user');
      }
    } catch (error) {}
  }

  //Salir
  logOut() {
    return this.firebaseAuthenticationService
      .signOut()
      .then(() => {
        localStorage.removeItem('auth_token'); // Eliminar el token de localStorage
        this.router.navigate(['login']); // Redirigir al login
        this.userData = null; // Limpiar los datos de usuario
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error); // Manejar errores en el logout
      });
  }

  getUserData() {
    return this.firebaseAuthenticationService.currentUser;
  }
}