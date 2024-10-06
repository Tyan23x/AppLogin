import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  public isFormValid: boolean = false;

  @Input() title: string= '';
  @Input() message: string= '';
  @Input() message_footer: string= '';
  @Input() link: string= '';
  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public phone!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public singupForm!: FormGroup;

  
  @Output() formValid = new EventEmitter<boolean>(); 
  @Output() formSubmit = new EventEmitter<any>();

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
    this.age = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required]);

    this.singupForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      phone: this.phone,
      email: this.email,
      password: this.password,
      image: this.image
    });

  }
}