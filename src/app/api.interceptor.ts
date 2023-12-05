// src/app/interceptors/api.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import axios from 'axios';
// import NProgress from 'nprogress';
import * as NProgress from 'nprogress';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Start the progress bar
    NProgress.start();

    // Add token to the header (replace 'YOUR_TOKEN' with the actual token)
    const token = 'melvin';
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Successful response, stop the progress bar
          NProgress.done();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Stop the progress bar
        NProgress.done();

        // Handle failed responses
        console.error('Interceptor Error:', error);

        // Pass the error along to the calling service
        return throwError(error);
      })
    );
  }
}
