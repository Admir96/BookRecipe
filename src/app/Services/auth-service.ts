import {ErrorHandler, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

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

  constructor(private  http:HttpClient) {
  }

  signUp(email:string, password:string)
  {
    return this.http.post<IAuth>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUD9CdXiBIRWIeQR6zI4KgiQmlxPcSMMY',
      {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.ErrorHandler));
  }

  login(email:string,password:string)
  {
    return this.http.post<IAuth>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUD9CdXiBIRWIeQR6zI4KgiQmlxPcSMMY',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.ErrorHandler));
    };



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
}
