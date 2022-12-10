import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../auth/user.model';
import { AuthService } from '../shared/auth.service';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}
 
  isAuthenticated:boolean;
  user : User;

 
  ngOnInit(): void {
    this.authService.user.subscribe(res => {
        this.user = res;
        this.isAuthenticated = this.user? true : false;
        console.log(this.isAuthenticated);
        
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
   this.authService.user.unsubscribe();
  }
}
