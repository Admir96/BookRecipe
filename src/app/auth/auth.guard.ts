import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../Services/auth-service";
import {Observable, take} from "rxjs";
import {map} from "rxjs/operators";
@Injectable()
export class AuthGuard implements  CanActivate{
  constructor(private  authService:AuthService, private  router:Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> {
 return this.authService.User.pipe(take(1), map(user =>{
   const isAuth = !!user;
   if(isAuth)
     return true;

   return this.router.createUrlTree(['/auth'])
 })
 )}
}
