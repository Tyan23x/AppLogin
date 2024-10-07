import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/shared/components/popover/popover.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public title!: FormControl;
  public description!: FormControl;

  public taskForm!: FormGroup;

  @Input() tasks: { title: string, description: string, date : Date, done: boolean; }[] = [];

  constructor(private readonly navCtrl: NavController, private readonly popoverCtrl: PopoverController,private authService: AuthService) {
    this.initForm();
  }

  async presentPopover(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
    });
    
    await popover.present();

    const { data } = await popover.onDidDismiss(); // Capturar la opción seleccionada
    if (data === 'updateProfile') {
      // this.updateProfile();
    } else if (data === 'logOut') {
      this.LogOut();
    }
  }
  public LogOut() {
    this.authService.logOut();
  }

  private initForm() {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.description = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]);

    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description,
    });
  }
}