import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService) {
    this.initForm();
  }

  logIn(email: string, password: string) {
    this.authService.logInWithEmailAndPassword(email, password);
  }
  public email!: FormControl;
  public password!: FormControl;

  public loginForm!: FormGroup;

  ngOnInit() {}

  public doLogin() {}
  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }


}
