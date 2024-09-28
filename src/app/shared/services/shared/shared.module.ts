import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { FormComponent } from '../../components/form/form.component';
import { CardComponent } from '../../components/card/card.component';
import { AnimationComponent } from '../../components/animation/animation.component';


const COMPONENTS = [InputComponent, ButtonComponent, FormComponent, CardComponent, AnimationComponent]
const MODULES = [CommonModule, FormsModule, IonicModule]

@NgModule({
  declarations: [... COMPONENTS],
  imports: [
    ... MODULES
  ],
  exports: [...COMPONENTS, ...MODULES]
})
export class SharedModule { }
