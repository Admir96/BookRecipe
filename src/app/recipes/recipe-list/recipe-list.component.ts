import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipesService} from "../../Services/recipes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[]
  recipeChanged = this.recipeService.recipeChanged;
  subcription: Subscription;



  constructor(private recipeService: RecipesService, private router: Router, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.subcription = this.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipe();
  }


  onNewRecipe()
  {
    this.router.navigate(['new'], {relativeTo:this.route});
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
