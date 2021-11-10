import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthActiveGuardGuard } from './guards/auth-active-guard.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
     canLoad:[AutoLoginGuard]// Check if we should show the introduction or forward to inside
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad:[AuthGuard]// Secure all child pages
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'tabs-menu',
    loadChildren: () => import('./pages/tabs-menu/tabs-menu.module').then( m => m.TabsMenuPageModule),
     canLoad:[AuthGuard],// Secure all child pages
     canActivate: [AuthActiveGuardGuard]
  },
  {
    path:'support',
    loadChildren:()=>import('./pages/support/support.module').then(s=>s.SupportPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
  },
  {
    path:'support',
    loadChildren:()=>import('./pages/support/support.module').then(s=>s.SupportPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
