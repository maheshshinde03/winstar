import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WithdrawPointsPageRoutingModule } from './withdraw-points-routing.module';

import { WithdrawPointsPage } from './withdraw-points.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WithdrawPointsPageRoutingModule
  ],
  declarations: [WithdrawPointsPage]
})
export class WithdrawPointsPageModule {}
