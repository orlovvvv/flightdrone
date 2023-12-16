import { Routes } from '@angular/router';
import { SessionGuard } from './shared/guard/session.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page'),
    title: 'Login'
  },
  {
    path: 'home',
    canActivate: [SessionGuard()],
    loadComponent: () => import('./home/home.page'),
    title: 'Home'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
