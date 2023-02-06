import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../recipes/recipe.model";
import {RecipesService} from "./recipes.service";
import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
  constructor(private recipeService:RecipesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   const recipe = this.recipeService.getRecipe();
   if(recipe.length === 0) {
     return this.recipeService.fatchData();
   }
   else return recipe;
  }
}
