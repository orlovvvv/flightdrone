import { Routes } from '@angular/router';
import { SessionGuard } from './shared/guard/session.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page'),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page'),
    canActivate: [SessionGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
