import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  )
  
  

  {
    //comprueba estado de auth
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('auth_token', JSON.stringify(this.userData)); // Almacena el token en local storage
      } else {
        localStorage.setItem('auth_token', 'null'); // Elimina el token en local storage
      }
    });
  }

  //Ingresar
  logInWithEmailAndPassword(email: string, password: string){
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
    .catch((error) =>{
      alert(error.message);
    })
  }

  //Registro
  signUpWithEmailAndPassword(email: string, password: string){
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
    .catch((error) =>{
    alert(error.message);
    })
  }

  //Observa el estado del usuario
  observeUserState(){
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']))
    })
  }

  //Verifica si el usuario está logueado
  get isLogged(): boolean{
    const user = JSON.parse(localStorage.getItem('auth_token')!);
    return user !== null;
  }

  //Salir
  logOut(){
    return this.firebaseAuthenticationService.signOut()
      .then(() => {
        localStorage.setItem('auth_token', 'null');
        this.router.navigate(['login']);
        this.userData = null;
      })
  }
}
