import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService, IAuth} from "../Services/auth-service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})


export class AuthComponent {
IsLogin = true;
isLoading = false;
isError = null;
  onSubmit(form: NgForm)
  {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObservable:Observable<IAuth>;

    if (this.IsLogin)
    {
    authObservable = this.authService.login(email,password);
    }
  else {
   authObservable = this.authService.signUp(email, password);
   form.reset();
    }

    authObservable.subscribe(response =>{
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['../recipe']);
    }, error =>{
      console.log(error);
      this.isError = error;
      this.isLoading = false;
    })
  }


constructor(private authService:AuthService, private router:Router) {
}
  onSwitchMode(){
    this.IsLogin = !this.IsLogin;
}
}
