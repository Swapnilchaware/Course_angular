import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isShowSpinner: boolean = true;
  constructor(private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request', request);
    // this.spinner.show();

    // if (this.isShowSpinner === false) { /* TODO document why this block is empty */ }
    // else
    //   this.spinner.show();

    const modifiedRequest = request.clone( {
      headers : request.headers.append('Auth','xyz')
    })

    return next.handle(modifiedRequest).pipe(
      tap(event=>{
          console.log(event);

          if (event.type === HttpEventType.Response) {
            // this.spinner.hide();
            console.log('Data Arrived');
            console.log(event.body);
            
          } }))

          
          
    //   })
    // return next.handle(request).pipe(
    //   tap((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       this.spinner.hide();
    //     }
    //   })
      
    // )

  }


}
