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
  public avatarUrl: string = ''; // Variable para almacenar la URL del avatar


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
  public signupForm!: FormGroup;

  @Output() formValid = new EventEmitter<boolean>();
  @Output() formSubmit = new EventEmitter<any>();

  constructor(
    private readonly authService: AuthService,
    private readonly loadingSrv: LoadingService,
    private readonly toAstr: ToastService,
    private firestoreSrv: FirestoreService
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
    if (this.signupForm.valid) {
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
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      try {
        this.loadingSrv.show();
        console.log('Form data:', this.signupForm.value);
        const { email, password } = this.signupForm.value;
        await this.authService.signUpWithEmailAndPassword(
          email,
          password,
          userData
        );
        this.loadingSrv.dismiss();
      } catch (error) {
        this.loadingSrv.dismiss();
        console.log('Error al registrar:', error);
        this.toAstr.presentToast('incorrect credentials', false);
      }
    } else {
      this.toAstr.presentToast('Required fields are incomplete', false);
    }
  }

  public async doUpdate() {
    try {
      this.loadingSrv.show();
      const userData = this.signupForm.value;
      console.log('Update data:', userData);
      
      // Llamada al servicio Firestore para actualizar el perfil
      await this.firestoreSrv.updateUserProfile(this.userId, userData);

      this.loadingSrv.dismiss();
      this.toAstr.presentToast('Profile updated successfully!', true);
    } catch (error) {
      this.loadingSrv.dismiss();
      this.toAstr.presentToast('Error updating profile', false); 
    }
  }

  public handleImageUploaded(url: string) {
    this.signupForm.patchValue({ image: url });
  }

  public setAvatar(url: string) {
    this.avatarUrl = url;
  }

  public setFormData(user: any) {
    this.signupForm.patchValue({
      image: user.image || '',
      name: user.name || '',
      lastName: user.lastName || '',
      age: user.age || '',
      phone: user.phone || '',
      email: user.email || '',
      password: user.password || '', 
    });
    if (user.image) {
      this.setAvatar(user.image);
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

    this.signupForm = new FormGroup({
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