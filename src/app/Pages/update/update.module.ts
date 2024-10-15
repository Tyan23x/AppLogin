import { NgModule } from '@angular/core';

import { UpdatePageRoutingModule } from './update-routing.module';

import { UpdatePage } from './update.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    UpdatePageRoutingModule
  ],
  declarations: [UpdatePage]
})
export class UpdatePageModule {}
