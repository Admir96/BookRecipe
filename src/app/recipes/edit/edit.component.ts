import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipesService} from "../../Services/recipes.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  id: number;
  editMode = false;
  recipeForm : FormGroup;



  constructor(private Route:ActivatedRoute,
              private recipeService: RecipesService,
              private router:Router) {
  }

  ngOnInit()
  {
   this.Route.params.subscribe((params:Params) =>{
     this.id = +params['id'];
     this.editMode = params['id'] != null;
     this.initForm();

   })
  }
  private initForm()
  {
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeName = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode)
    {
      const recipe = this.recipeService.getByIndex(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;

      if(recipe['Ingredients'])
      {
        for(let ingrid of recipe.Ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingrid.name, Validators.required),
              'amount': new FormControl(ingrid.amount,
                [Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients' : recipeIngredients,
    })
  }

  onSubmit()
  {
    let recipe = this.recipeForm.value;
    if(!this.editMode)
    {
      this.recipeService.addRecipe(recipe);
    }
    else {
      this.recipeService.updateRecipe(this.id,recipe);
    }
    this.onCancel();
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngridient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).controls.push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null,
          [ Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)]),
      })
    )
  }

  onCancel()
  {
    this.router.navigate(['../'], {relativeTo:this.Route});
  }

  onDeleteIngr(index: number)
{
  (<FormArray>this.recipeForm.get(['ingredients'])).removeAt(index);
}

}
