import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HTTP_INTERCEPTORS,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    token: String = '';

    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            
            let token;
            
            this.authService.user.subscribe(res => {
                token = res.token
            });

            let newRequest = req.clone({
                params: new HttpParams().set('auth',token)
            });

            return next.handle(newRequest);
        
    
}
}

export const AuthInterceptors = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};