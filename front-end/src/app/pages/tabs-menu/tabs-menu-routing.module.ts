import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsMenuPage } from './tabs-menu.page';

const routes: Routes = [
  {
    path: '',
    component: TabsMenuPage ,
    children:[
      {
        path:'', redirectTo:'dashboard'
      },
      {
        path:'dashboard',
        loadChildren:()=>import('../dashboard/dashboard.module').then(h=>h.DashboardPageModule)
      },

      {
        path:'profile',
        loadChildren:()=>import('../profile/profile.module').then(n=>n.ProfilePageModule)
      },

      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren:()=>import('../notifications/notifications.module').then(n=>n.NotificationsPageModule)
          },
          {
            path: 'notification-details/:id',
            loadChildren: () => import('../notification-details/notification-details.module').then(m => m.NotificationDetailsPageModule)
          }
        ]
      },

      // {
      //   path:'notifications',
      //   loadChildren:()=>import('../notifications/notifications.module').then(n=>n.NotificationsPageModule)
      // },

      {
        path:'newgame',
        loadChildren:()=>import('../newgame/newgame.module').then(n=>n.NewgamePageModule)
      },

      {
        path: 'newgame/:count',
        loadChildren: () => import('../newgame/newgame.module').then(n=>n.NewgamePageModule)
      },

      {
        path:'history',
        loadChildren:()=>import('../history/history.module').then(h=>h.HistoryPageModule)
      },
      
      {
        path:'withdraw-points',
        loadChildren:()=>import('../withdraw-points/withdraw-points.module').then(h=>h.WithdrawPointsPageModule)
      },

    
      {
        path: 'transactions',
        loadChildren: () => import('../transactions/transactions.module').then( m => m.TransactionsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsMenuPageRoutingModule {}
