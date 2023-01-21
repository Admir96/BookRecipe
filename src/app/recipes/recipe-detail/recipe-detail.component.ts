import { Component, OnInit, Input } from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {RecipesService} from "../../Services/recipes.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe:Recipe;
id:number;
  constructor(private Router:Router,
              private recipeService: RecipesService,
              private Route:ActivatedRoute) {

  }

  ngOnInit() {
    this.Route.params.subscribe((params:Params)=>{
      this.id = +params['id'],
      this.recipe = this.recipeService.getByIndex(this.id)
    });
  }
  OnAddShoppingList(){
this.recipeService.addIngriedientInShoppingList(this.recipe.Ingredients);
  }
  onEditRecipe()
  {
    this.Router.navigate(['edit'], {relativeTo: this.Route});
  }
}
