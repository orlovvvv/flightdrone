import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../data/auth.service';

export const SessionGuard = (): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    console.log(authService.user().status)
    if (authService.user().status === 'success') {
      return true;
    }

    return router.parseUrl('login');
  };
};
