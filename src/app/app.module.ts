import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {DropDownDirective} from "./recipes/recipe-detail/drop-down.directive";
import {RecipesService} from "./Services/recipes.service";
import {ShoppingListService} from "./Services/shopping-list.service";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {RoutingModule} from "./Routing.module";
import {StartComponent} from "./start/start.component";
import {EditComponent} from "./recipes/edit/edit.component";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDirective,
    StartComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    RoutingModule
  ],
  providers: [RecipesService,ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
