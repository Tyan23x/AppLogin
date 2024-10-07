import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/controllers/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
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
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Usuario registrado:", userCredential);
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {

        return Promise.reject(error);
      });
  }

  //Verifica si el usuario está logueado
  public isLogged(): boolean {
    const user = JSON.parse(localStorage.getItem('auth_token')!);
    return user !== null
  }


  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
        console.log("🚀 ~ AuthService ~ .then ~ userCredential:", userCredential);
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
    } catch (error) {

    }
  }

  //Salir
  logOut() {
    return this.firebaseAuthenticationService.signOut()
      .then(() => {
        localStorage.removeItem('auth_token');  // Eliminar el token de localStorage
        this.router.navigate(['login']);  // Redirigir al login
        this.userData = null;  // Limpiar los datos de usuario
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);  // Manejar errores en el logout
      });
  }
}
