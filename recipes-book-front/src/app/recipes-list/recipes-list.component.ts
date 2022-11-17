import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';

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

  recipe$ = this.service.recipe$;

  constructor(private service: RecipesService) { }


}
