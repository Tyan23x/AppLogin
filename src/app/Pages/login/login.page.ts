import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService) { }

  logIn(email: string, password: string){
    this.authService.logInWithEmailAndPassword(email, password)
  }

  ngOnInit() {
  }

  

}
