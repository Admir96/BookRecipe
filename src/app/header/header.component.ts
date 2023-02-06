import {Component, EventEmitter, Output} from '@angular/core';
import {RecipesService} from "../Services/recipes.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private recipeService: RecipesService) {}

  onSaveData()
  {
    this.recipeService.storeRecipes();
  }
  onFetchData()
  {
    this.recipeService.fatchData().subscribe();
  }
}


