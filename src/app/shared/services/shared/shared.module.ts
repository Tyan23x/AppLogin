import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { FormComponent } from '../../components/form/form.component';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { StorageService } from '../storage/storage.service';

const COMPONENTS = [InputComponent, ButtonComponent, FormComponent, AvatarComponent]
const MODULES = [CommonModule, FormsModule, IonicModule]
const PROVIDERS = [
  StorageService,
]
@NgModule({
  declarations: [... COMPONENTS],
  imports: [
    ... MODULES
  ],
  providers: [...PROVIDERS],
  exports: [...COMPONENTS, ...MODULES]
})
export class SharedModule { }
