import {Component} from "@angular/core";

@Component(
  {
    selector:'app-loading-screen',
    template:'<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
    styleUrls:['./loading-screen.component.css']
  }
)
export class loadingScreenComponent {

}
