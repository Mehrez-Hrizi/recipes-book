import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError, concatMap, debounceTime, of, tap } from 'rxjs';
import { Recipe } from '../core/model/recipe.model';
import * as recipeTags from '../core/model/tags';
import { RecipesService } from '../core/services/recipes.service';

@Component({
  selector: 'app-recipe-creation',
  templateUrl: './recipe-creation.component.html'
})
export class RecipeCreationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private service: RecipesService) { }

  recipeForm = this.formBuilder.group({
    id: Math.floor(1000 + Math.random() * 9000),
    title: [''],
    ingredients: [''],
    tags: [''],
    imageUrl: [''],
    cookingTime: [''],
    yield: [''],
    prepTime: [''],
    steps: ['']
  });

  tags = recipeTags.TAGS;

  ngOnInit(): void {}
  valueCahnges$ = this.recipeForm.valueChanges.pipe(
    debounceTime(10000),
    concatMap(
      formValue => this.service.saveRecipe(formValue)),
    catchError(errors => of(errors)),
    tap(result => this.saveSuccess(result))
  );

  saveSuccess(result: Recipe) {
    console.log(result, 'Saved successfully');
  }

}
