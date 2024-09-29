import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { FormComponent } from '../../components/form/form.component';
import { CardComponent } from '../../components/card/card.component';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { AnimationComponent } from '../../components/animation/animation.component';
import { StorageService } from '../storage/storage.service';

const COMPONENTS = [
  InputComponent,
  ButtonComponent,
  FormComponent,
  CardComponent,
  AnimationComponent,
  AvatarComponent,
];
const MODULES = [CommonModule, FormsModule, IonicModule, ReactiveFormsModule];
const PROVIDERS = [StorageService];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {}
