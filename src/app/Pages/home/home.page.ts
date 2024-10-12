import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/shared/components/popover/popover.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';
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
    private readonly navCtrl: NavController, 
    private readonly popoverCtrl: PopoverController,
    private authService: AuthService,
    private readonly modalCtrl: ModalController,
    private readonly loadingSrv: LoadingService,) {
    this.initForm();
  }

  async openSettingsModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      cssClass: 'settings-modal',
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
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