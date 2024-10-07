import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/shared/components/popover/popover.component';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public title!: FormControl;
  public description!: FormControl;
  public id: string = '';

  public taskForm!: FormGroup;

  @Input() tasks: {
    title: string;
    description: string;
    date: Date;
    done: boolean;
  }[] = [];

  constructor(
    private readonly popoverCtrl: PopoverController,
    private authService: AuthService,
    private readonly loadingSrv: LoadingService,
    private readonly navCtrl: NavController
  ) {
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
      this.updateProfile();
    } else if (data === 'logOut') {
      this.LogOut();
    }
  }

  public async LogOut() {
    this.loadingSrv.show();  
    await this.authService.logOut();  
    this.loadingSrv.dismiss();  
  }

  updateProfile() {
    this.navCtrl.navigateForward(`/update/${this.id}`);
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