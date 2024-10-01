import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public singupForm!: FormGroup;

  constructor(private authService: AuthService) {
    this.initForm();
  }

  async signIn(email: string, password: string) {
    await this.authService.signUpWithEmailAndPassword(email, password);
  }

  ngOnInit() {}

  public doRegister() {}

  private initForm() {
    this.image = new FormControl('');
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);

    this.singupForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      image: this.image,
    });
  }
}
