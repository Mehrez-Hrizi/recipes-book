import { Component, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { RecipesService } from '../core/services/recipes.service';
import { Recipe } from '../core/model/recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {

  //The clasic pattern for fetching data
  /*recipes$ = this.service.recipes$;
  recipes!: Recipe[];
  destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    /* this.service.getRecipes().pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(
      recipes => this.recipes = recipes
    ); 
    
  }

 ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
 */

  recipes$ = this.service.recipes$;
  filterRecipesAction$ = this.service.filterRecipesAction$;
  filtredRecipes$ = combineLatest([this.recipes$, this.filterRecipesAction$])
    .pipe(
      map(([recipes, filter]: [Recipe[], Recipe]) => {
        return recipes.filter(recipe =>
          recipe.title?.toLowerCase()
            .indexOf(filter.title?.toLowerCase() ?? '') != -1
        );
      })
    );

  constructor(private service: RecipesService) { }


}
