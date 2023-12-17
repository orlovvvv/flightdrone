import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err instanceof ErrorEvent) {
          console.log('Error Event');
        }
      } else {
        console.log('An error occurred:', err.error);
      }
      return throwError(() => new Error(err.statusText));
    })
  )
};

