import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.page'),
    title: 'Logowanie'
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./auth/register/register.page'),
    title: 'Rejestracja'
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./home/home.page'),
    title: 'Strona główna'
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },


];
