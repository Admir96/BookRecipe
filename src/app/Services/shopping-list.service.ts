import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  IngrediantChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }
  getEditedItem(index: number)
  {
    return this.ingredients[index];
  }
  addIngredient(ingr:Ingredient){
    this.ingredients.push(ingr);
    this.IngrediantChanged.next(this.ingredients.slice());
  }
  addIngredients(ingr:Ingredient[]){
    this.ingredients.push(...ingr);
    this.IngrediantChanged.next(this.ingredients.slice());
  }
  EditIngridient(index:number, newIngridient: Ingredient)
  {
    this.ingredients[index] = newIngridient;
    this.IngrediantChanged.next(this.ingredients.slice());
  }
  deleteIngridient(index: number)
  {
   this.ingredients.splice(index,1);
    this.IngrediantChanged.next(this.ingredients.slice());
  }
}
