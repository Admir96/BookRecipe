import { NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {StartComponent} from "./start/start.component";
import {EditComponent} from "./recipes/edit/edit.component";


const appRouting: Routes = [
  {path:'', redirectTo:'/recipe', pathMatch:'full'},

  {path: 'recipe', component: RecipesComponent, children:[
      {path:'', component:StartComponent},
      {path:'new', component:EditComponent},
      {path:':id', component:RecipeDetailComponent},
      {path:':id/edit', component:EditComponent},
    ]},

  {path: 'shopping-list', component: ShoppingListComponent}
];
@NgModule({

  imports: [
    RouterModule.forRoot(appRouting)
  ],
  exports: [RouterModule]
})
export class RoutingModule{}

