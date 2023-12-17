import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page'),
    title: 'Login'
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./home/home.page'),
    title: 'Home'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
