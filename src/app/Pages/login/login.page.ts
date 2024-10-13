import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { ToastService } from 'src/app/shared/controllers/toast/toast.service';
import { AuthService } from 'src/app/shared/services/auths/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private readonly loadingSrv: LoadingService,
    private readonly toAstr: ToastService,
    private readonly navCtrl: NavController // Add NavController import
  ) {
    this.initForm();
  }

  logIn(email: string, password: string): Promise<void> {
    return this.authService.logInWithEmailAndPassword(email, password)
      .then(() => {
        this.navCtrl.navigateForward('home')
      })
      .catch((error) => {
        throw error;  
      });
  }

  ngOnInit() {}

  public async doLogin() {
    if (this.loginForm.valid) {
      this.loadingSrv.show('Logging in...');  
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;  
      try {
        await this.logIn(email, password);
        this.loadingSrv.dismiss(); 
        this.toAstr.presentToast('WELCOME!', true);  
      } catch (error) {
        this.loadingSrv.dismiss();  
        this.toAstr.presentToast('User not found or incorrect credentials', false);  
      }
    } else {
      this.toAstr.presentToast('Required fields are incomplete', false);
    }
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,      
    });
  }
}