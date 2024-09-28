import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG)
  ]
})
export class CoreModule { }
