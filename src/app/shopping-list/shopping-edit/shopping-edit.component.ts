import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../Services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  subcription:Subscription;
  editMode = false;
  editItemIndex:number;
  editItem: Ingredient;

  constructor(private slServer:ShoppingListService) { }

  ngOnInit() {
    this.subcription = this.slServer.startedEditing.subscribe(
      (index:number) =>{
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = this.slServer.getEditedItem(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })

      }
    );
  }
  OnAddItem(form : NgForm){
    const value = form.value;
    const ingr = new Ingredient(value.name, value.amount);
    if(this.editMode)
    {
      this.slServer.EditIngridient(this.editItemIndex,ingr);
    }
    else {
      this.slServer.addIngredient(ingr);
    }
    this.editMode = false;
    form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete()
  {
    this.slServer.deleteIngridient(this.editItemIndex);
    this.onClear();
  }
}
