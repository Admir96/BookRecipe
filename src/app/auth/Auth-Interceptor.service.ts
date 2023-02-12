import {Injectable} from "@angular/core";
import {AuthService} from "../Services/auth-service";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpParams} from "@angular/common/http";
import {exhaustMap, take} from "rxjs";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService:AuthService) {}

  intercept(req:HttpRequest<any>, next:HttpHandler)
  {
return this.authService.User.pipe(take(1), exhaustMap(user =>{
  if(!user)
    return next.handle(req);

  const modified = req.clone({
    params: new HttpParams().set('auth', user.Token)
  });
  return next.handle(modified);
}))
  }
}
