import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../auth/user.model';


interface SignUpUser {
  idToken: String;
  email: String;
  refreshToken: String;
  expiresIn: String;
  localId: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey: String = 'AIzaSyBB8i5T_1VAqPN5u8EQrbuTIWgOCZFpWnA';

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {

  }

  signUp(email: String, password: String) {
    const query = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<SignUpUser>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey, query)
      .pipe(tap(response => {
        const expirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));
        const user = new User(response.email, response.localId, response.idToken, expirationDate);
        this.user.next(user);
      }));
  }

  logIn(email: String, password: String) {
    const query = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<SignUpUser>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey, query)
      .pipe(tap(response => {
        const expirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));
        const user = new User(response.email, response.localId, response.idToken, expirationDate);
        this.user.next(user);
      }))
      ;
  }
}
