import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointsModalPageRoutingModule } from './points-modal-routing.module';

import { PointsModalPage } from './points-modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PointsModalPageRoutingModule
  ],
  declarations: [PointsModalPage]
})
export class PointsModalPageModule {}
