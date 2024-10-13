import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then(m => m.HomePageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'update/:uid',
    loadChildren: () => import('./Pages/update/update.module').then(m => m.UpdatePageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }