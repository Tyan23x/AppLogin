import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { ToastService } from '../../controllers/toast/toast.service';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public userId: string = ''; // ID del usuario autenticado

  public isFormValid: boolean = false;

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() message_footer: string = '';
  @Input() link: string = '';
  @Input() mode: 'register' | 'update' = 'register'; // Agregar modo
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

  constructor(
    private readonly firestoreSrv: FirestoreService,
    private readonly authService: AuthService,
    private readonly loadingSrv: LoadingService,
    private readonly toAstr: ToastService,
  ) {}

  ngOnInit() {

    this.initForm();
    
    // Obtener el ID del usuario autenticado
    this.authService.getUserData().then((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  public async handleFormSubmit() {
    if (this.singupForm.valid) {
      const userData = this.singupForm.value;
      try {
        await this.firestoreSrv.createUserProfile(this.userId, userData);
        console.log('Datos guardados en Firestore exitosamente');
      } catch (error) {
        console.error('Error guardando datos en Firestore:', error);
      }
      if (this.mode === 'register') {
        await this.doRegister();
      } else if (this.mode === 'update') {
        await this.doUpdate();
      }
    } else {
      this.toAstr.presentToast('Required fields are incomplete', false);
    }
  }

  public async doRegister() {
    if (this.singupForm.valid) {
      try {
        this.loadingSrv.show();
        console.log('Form data:', this.singupForm.value);
        const { email, password } = this.singupForm.value;
        await this.authService.signUpWithEmailAndPassword(email, password);
        this.loadingSrv.dismiss();
      } catch (error) {
        this.loadingSrv.dismiss();
        console.log('Error al registrar:', error);
        this.toAstr.presentToast('incorrect credentials', false);  
      }
    } else {
      this.toAstr.presentToast('Required fields are incomplete',false);
    }
  }

  public async doUpdate() {
    try {
      this.loadingSrv.show();
      console.log('Update data:', this.singupForm.value);
      // Lógica para actualizar la información del usuario
      this.loadingSrv.dismiss();
      this.toAstr.presentToast('Profile updated successfully!', true);
    } catch (error) {
      this.loadingSrv.dismiss();
      this.toAstr.presentToast('Error updating profile', false);
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
      image: this.image,
    });
  }
}