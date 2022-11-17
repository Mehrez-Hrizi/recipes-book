import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  //The reactive pattern for fetching data 
  recipe$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`)
  .pipe(
    catchError(error => 
      of([])
    ))
  ;

  constructor(private http: HttpClient) { }

  //The clasic pattern for fetching data
  /* getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
  } */
}
