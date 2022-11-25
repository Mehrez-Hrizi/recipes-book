import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  //The reactive pattern for fetching data 
  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`)
  .pipe(
    catchError(error => 
      of([])
    ))
  ;

  //Create the action stream
  private filterRecipeSubject = new BehaviorSubject<Recipe>({title: ""});
  //Extract the readonly stream
  filterRecipesAction$ = this.filterRecipeSubject.asObservable();


  constructor(private http: HttpClient) { }

  //The clasic pattern for fetching data
  /* getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
  } */

  updateFilter(criteria: Recipe) {
    this.filterRecipeSubject.next(criteria);
  }

  saveRecipe(formValue: Recipe): Observable<Recipe> {
    return this.http.post(`${BASE_PATH}/recipes/save`, formValue);
  }
}
