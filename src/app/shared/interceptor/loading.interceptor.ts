import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../service/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Start the loader when the request is made
    this.loadingService.show();

    return next.handle(req).pipe(
      // Hide the loader when the request completes (either success or error)


      finalize(() => {

        setTimeout(() => {
          this.loadingService.hide()
        }, 2000)
      })
    );
  }
}
