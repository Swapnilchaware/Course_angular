import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from 'src/environments/environment.prod';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private _http: HttpClient,
              private recipeService: RecipeService) { 

  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this._http.put(environment.url + 'recipes.json',recipes).subscribe(res => console.log(res));
  }

  fetchRecipes() {
    this._http.get<Recipe[]>(environment.url + 'recipes.json')
              .subscribe(res => {
                this.recipeService.setRecipe(res);
              })
  }

}
