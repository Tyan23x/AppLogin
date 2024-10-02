import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public isFormValid: boolean = false;

  constructor(private authService: AuthService) { }

  async signIn(email: string, password: string) {
    await this.authService.signUpWithEmailAndPassword(email, password);
  }

  ngOnInit() {}

  public onFormValidityChange(isValid: boolean) {
    this.isFormValid = isValid;
  }
  public doRegister() {}
}