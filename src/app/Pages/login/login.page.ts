import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;

  user = {} as User;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initForm();
  }

  async logIn(email: string, password: string) {
    await this.authService.logInWithEmailAndPassword(email, password);
  }
  
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
