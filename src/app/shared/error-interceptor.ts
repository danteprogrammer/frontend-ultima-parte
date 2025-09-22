import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403 || error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
        alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
      }

      return throwError(() => error);
    })
  );
};
