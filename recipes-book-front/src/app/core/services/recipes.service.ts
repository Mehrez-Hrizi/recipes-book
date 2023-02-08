import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { catchError, shareReplay, switchMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
const BASE_PATH = environment.basePath;
const REFRESH_INTERVAL = 50000;
const timer$ = timer(0, REFRESH_INTERVAL);

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  //The reactive pattern for fetching data 
  recipes$ = this.getRecipesList();

  //Create the action stream
  private filterRecipeSubject = new BehaviorSubject<Recipe>({ title: "" });
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

  getRecipesList(): Observable<Recipe[]> {
    if (!this.recipes$) {
      return timer$.pipe(
        switchMap(_ => {
          return this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError(error => of([]))
      );
    }
    return this.recipes$;
  }
}
