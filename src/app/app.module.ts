import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";


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
import {AuthComponent} from "./auth/auth.component";
import {AuthService} from "./Services/auth-service";
import {loadingScreenComponent} from "./loading-screen/loading-screen.component";
import {AuthInterceptorService} from "./auth/Auth-Interceptor.service";




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
    EditComponent,
    AuthComponent,
    loadingScreenComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    RoutingModule,
    HttpClientModule
  ],
  providers: [RecipesService,ShoppingListService, AuthService, {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
