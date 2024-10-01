import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import { CardComponent } from './components/card/card.component';
import { AnimationComponent } from './components/animation/animation.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { StorageService } from './services/storage/storage.service';


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
