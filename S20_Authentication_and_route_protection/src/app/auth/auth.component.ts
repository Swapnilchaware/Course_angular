import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error ='';

  authObservable : Observable<any>;

  constructor(private _authService: AuthService,
              private router:Router) {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(ngForm: NgForm){
    
    if(ngForm.valid) {
      this.isLoading = true;
      const email = ngForm.value.email;
      const password = ngForm.value.password;
  
      if (this.isLoginMode) {
        this.authObservable = this._authService.logIn(email,password)
      } else {
        this.authObservable =this._authService.signUp(email,password)
     
      }

     this.authObservable.subscribe(res => {
        console.log(res)
       this.isLoading = false;
       this.router.navigate(['/recipes']);
     }
       ,errResponse => {console.log(errResponse)
        //  switch(errResponse.error.errors.message){
        //    case 'EMAIL_EXISTS':
        //      this.error = 'Email exits;'
        //  }
        // if (errResponse.error.errors.message) {
        //   this.error = 
        // }
        this.isLoading = false;
        this.error = errResponse.error.error.message? errResponse.error.error.message : '';
        console.log(this.error);
        
        
       });

       
      ngForm.reset();  
    }

  }
}
