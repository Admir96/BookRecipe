import {ErrorHandler, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {UserModel} from "../auth/user.model";
import {Router} from "@angular/router";

export interface IAuth{

  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}
@Injectable()
export class AuthService {
User = new BehaviorSubject<UserModel>(null);
token:string = null;
tokenExpTimer = null;

  constructor(private  http:HttpClient, private router:Router) {
  }

  signUp(email:string, password:string)
  {
    return this.http.post<IAuth>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUD9CdXiBIRWIeQR6zI4KgiQmlxPcSMMY',
      {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.ErrorHandler),tap(response => {
      this.HandleUserAuth(response.email,response.localId,response.idToken,+response.expiresIn);
    }));
  }

  login(email:string,password:string)
  {
    return this.http.post<IAuth>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUD9CdXiBIRWIeQR6zI4KgiQmlxPcSMMY',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.ErrorHandler),tap(response => {
        this.HandleUserAuth(response.email,response.localId, response.idToken, +response.expiresIn);
      }));
    };


AutoLogin(){
  const user = JSON.parse(localStorage.getItem('userData'));
  if(!user)
    return;

  const loadUser = new UserModel(user.email,user.id, user.token, new Date(user.expiresIn));

  if(loadUser.Token)
    this.User.next(loadUser);
    const expTime = new Date(user.tokenExpTimer).getTime() - new Date().getTime();
    this.AutoLogout(expTime);
}
  private HandleUserAuth(email:string, userId:string, idToken:string, expiresIn:number)
  {
     const date = new Date(new Date().getTime() + expiresIn * 1000);

     const user = new UserModel(email, userId, idToken, date);

     this.User.next(user);
     this.AutoLogout(expiresIn * 1000);
     localStorage.setItem('userData', JSON.stringify(user));
  }
 private ErrorHandler(error:HttpErrorResponse){
    let errorMes = 'An error accurred !';
      if(!error.error || !error.error.error)
        return throwError(errorMes);

      switch (error.error.error.message){
        case 'EMAIL_EXISTS':
          errorMes = "Email already exists";
          break;
        case 'EMAIL_NOT_FOUND':
          errorMes ="Email does not exists";
          break;
        case 'INVALID_PASSWORD':
          errorMes = "Invalid password";
      }
      return throwError(errorMes);
    };

  logout(){
    this.User.next(null);
    this.router.navigate(['../auth']);
    localStorage.removeItem('userData');

    if(this.tokenExpTimer)
      clearTimeout(this.tokenExpTimer);
    this.tokenExpTimer = null;
  }

  AutoLogout(expirationDuration:number){
    this.tokenExpTimer = setTimeout(() =>{
      this.logout()
    }, expirationDuration);
  }
}
