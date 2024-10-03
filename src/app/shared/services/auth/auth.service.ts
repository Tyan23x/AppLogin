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
        localStorage.setItem('user', JSON.stringify(this.userData)); // Almacena el token en local storage
      } else {
        localStorage.setItem('user', 'null'); // Elimina el token en local storage
      }
    });
  }

  //Ingresar
  async logInWithEmailAndPassword(email: string, password: string){
    return await this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
    .catch((error) =>{
      alert(error.message);
    })
  }

  //Registro
  async signUpWithEmailAndPassword(email: string, password: string){
    return await this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
    .catch((error) =>{
    alert(error.message);
    })
  }

  //Observa el estado del usuario
  async observeUserState(){
    await this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['home']))
    })
  }

  //Verifica si el usuario está logueado
  get isLogged(): boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  //Salir
  async logOut(){
    return await this.firebaseAuthenticationService.signOut()
      .then(() => {
        localStorage.setItem('user', 'null');
        this.router.navigate(['login']);
        this.userData = null;
      })
  }
}
