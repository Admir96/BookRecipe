import { NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {StartComponent} from "./start/start.component";
import {EditComponent} from "./recipes/edit/edit.component";
import {AuthComponent} from "./auth/auth.component";
import {RecipeResolverService} from "./Services/recipe.resolver.service";


const appRouting: Routes = [
  {path:'', redirectTo:'/recipe', pathMatch:'full'},

  {path: 'recipe', component: RecipesComponent, children:[
      {path:'', component:StartComponent},
      {path:'new', component:EditComponent},
      {path:':id', component:RecipeDetailComponent, resolve:[RecipeResolverService]},
      {path:':id/edit', component:EditComponent, resolve:[RecipeResolverService]},
    ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path:'auth', component:AuthComponent}
];
@NgModule({

  imports: [
    RouterModule.forRoot(appRouting)
  ],
  exports: [RouterModule]
})
export class RoutingModule{}

