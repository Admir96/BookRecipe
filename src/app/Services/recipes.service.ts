import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {exhaustMap, Subject, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators"
import {AuthService} from "./auth-service";


@Injectable()
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private http: HttpClient, private authService:AuthService) {
  }

  getRecipe() {
    return this.recipes.slice();
  }

  getByIndex(index: number) {
    return this.recipes[index];
  }

  addIngriedientInShoppingList(ingridients: Ingredient[]) {
    this.slService.addIngredients(ingridients);
  }

  addRecipe(recipe: Recipe) {
     this.recipes.push(recipe);
     this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
     this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
onDelete(index:number)
{
  this.recipes.splice(index, 1);
   this.recipeChanged.next((this.recipes.slice()));
}
setRecipe(recipe:Recipe[])
{
  this.recipes = recipe;
  this.recipeChanged.next(this.recipes.slice());
}
storeRecipes(){
    const recipes = this.recipes;
    this.http.put('https://bookrecipe-f82e9-default-rtdb.firebaseio.com/recipe.json',recipes).subscribe(response =>{
      console.log(response);
    })
}
fatchData()
{
  return this.http.get<Recipe[]>('https://bookrecipe-f82e9-default-rtdb.firebaseio.com/recipe.json')
  .pipe(map(recipe =>{
    return recipe.map(recipes =>{
    return {...recipes, Ingredient : recipes.Ingredients ? recipes.Ingredients : []}})
  }),
   tap(response=>{
    this.setRecipe(response);}));
  }
}
