import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewgamePageRoutingModule } from './newgame-routing.module';

import { NewgamePage } from './newgame.page';
import {  PointsModalPage} from '../points-modal/points-modal.page'
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    NewgamePageRoutingModule
  ],
  declarations: [NewgamePage,PointsModalPage],
  entryComponents: [PointsModalPage],
})
export class NewgamePageModule {}
