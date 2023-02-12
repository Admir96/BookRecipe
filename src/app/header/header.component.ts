import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {RecipesService} from "../Services/recipes.service";
import {Subscription} from "rxjs";
import {AuthService} from "../Services/auth-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthendicated = false;
  userSub:Subscription;
  constructor(private recipeService: RecipesService, private userAuth:AuthService) {}

 ngOnInit() {
    this.userSub = this.userAuth.User.subscribe(user =>{
      this.isAuthendicated = !!user;
    });
 }

  onSaveData()
  {
    this.recipeService.storeRecipes();
  }
  onFetchData()
  {
    this.recipeService.fatchData().subscribe();
  }
  onLogout()
  {
    this.userAuth.logout();
  }

  ngOnDestroy(){
this.userSub.unsubscribe();
  }
}


