import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  @ViewChild('ingredient',{static : false}) ingredientForm : NgForm;

  editItemIndex : number;
  editMode : boolean = false;
  editIngredientItem : Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.slService.itemSelected.subscribe(response => {
      this.editItemIndex = response;
      this.editMode = true;
      this.editIngredientItem = this.slService.getIngredientByIndex(this.editItemIndex);
      this.ingredientForm.setValue({
        name : this.editIngredientItem.name,
        amount : this.editIngredientItem.amount
      });
    })
  }

  onAddItem(form:NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const ing = form.value;
    const newIngredient = new Ingredient(ing.name, ing.amount);

    if (this.editMode) {
      this.slService.updateIngredients(newIngredient,this.editItemIndex)
      this.editMode = false;
      
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.clear();

  }

  ngOnDestroy() {
    this.slService.itemSelected.unsubscribe();
  }

  clear() {
    this.editMode = false;
    this.ingredientForm.reset();
    
  }

  delete() {
    this.slService.deleteIngredients(this.editItemIndex);
    this.clear();
    
    
  }

}
