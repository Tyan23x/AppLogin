import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { FormComponent } from '../../components/form/form.component';

const COMPONENTS = [InputComponent, ButtonComponent, FormComponent];
const MODULES = [CommonModule, FormsModule, IonicModule, ReactiveFormsModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {}