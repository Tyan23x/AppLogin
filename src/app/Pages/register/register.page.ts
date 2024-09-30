import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signUp(email: string, password: string){
    this.authService.signUpWithEmailAndPassword(email, password);

    //una vez hecho el html, usar evento click
  }

}
