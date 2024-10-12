import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, PopoverController } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import { CardComponent } from './components/card/card.component';
import { AnimationComponent } from './components/animation/animation.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { StorageService } from './services/storage/storage.service';
import { RouterLink } from '@angular/router';
import { LoadingService } from './controllers/loading/loading.service';
import { ToastService } from './controllers/toast/toast.service';
import { PopoverComponent } from './components/popover/popover.component';
import { AuthService } from './services/auths/auth.service';
import { AuthGuard } from './services/guards/auth.guard';
import { ModalComponent } from './components/modal/modal/modal.component';


const COMPONENTS = [
  InputComponent,
  ButtonComponent,
  FormComponent,
  CardComponent,
  AnimationComponent,
  AvatarComponent,
  PopoverComponent,
  ModalComponent
];
const MODULES = [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, RouterLink];

const CONTROLLERS = [LoadingService, ToastService]

const PROVIDERS = [StorageService, AuthService, AuthGuard];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [...PROVIDERS, ...CONTROLLERS],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {}
