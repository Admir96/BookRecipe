import { Component, OnInit } from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipesService} from "../Services/recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
SelectedRecipe:Recipe;
  constructor(private recipesService:RecipesService) { }

  ngOnInit() {
this.recipesService.recipeSelected.subscribe((recipe : Recipe) =>
  this.SelectedRecipe = recipe);
  }

}
