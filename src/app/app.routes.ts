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
    canActivate: [SessionGuard()],
    loadComponent: () => import('./home/home.page'),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
