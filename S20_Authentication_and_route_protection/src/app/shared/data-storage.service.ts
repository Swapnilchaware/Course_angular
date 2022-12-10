import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  token: String = '';

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {
      
  }
  
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    
    this.http
      .put(
        'https://recipe-management-cf6bd-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
   
    return this.http
      .get<Recipe[]>(
        'https://recipe-management-cf6bd-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
