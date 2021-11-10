import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawPointsPage } from './withdraw-points.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawPointsPageRoutingModule {}
