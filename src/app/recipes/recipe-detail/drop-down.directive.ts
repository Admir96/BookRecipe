import {Directive, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: `[appDropDownDirective]`
})
export class DropDownDirective implements OnInit{
  constructor() { }
  ngOnInit(){}
  @HostBinding('class.open') isOpen = false;


@HostListener('click') toggleOpen()
{
  this.isOpen = !this.isOpen;
}
}
