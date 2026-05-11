import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * HTTP interceptor for global API configuration
 * Handles authentication, error handling, and common headers
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone request to add headers
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Global error handling
      console.error('API Error:', error);

      // Log different error types
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        console.error('Client-side error:', error.error.message);
      } else {
        // Server-side error
        console.error(`Server-side error: ${error.status} ${error.statusText}`);
      }

      return throwError(() => error);
    })
  );
};
