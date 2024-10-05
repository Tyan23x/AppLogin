import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auths/auth.service';
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

  constructor(private readonly authService: AuthService) {
    this.initForm();
  }

  ngOnInit() {}

  public async doRegister() {
    if (this.singupForm.valid) {
      try {
        console.log("Datos del formulario:", this.singupForm.value);
        const { email, password } = this.singupForm.value;
        await this.authService.signUpWithEmailAndPassword(email, password);
      } catch (error) {
        console.log("Error al registrar:", error);
      }
    } else {
      console.log("Formulario no válido");
    }
  }

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
