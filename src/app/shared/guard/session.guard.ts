import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../data/auth.service';

export const SessionGuard = (): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.user().session) {
      return true
    }
    return router.parseUrl('login');
  };
};
