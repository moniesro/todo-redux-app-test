import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('itemToEdit', { static: false }) txtItemToEdit: ElementRef; // acceso al elemento html
  // The { static: true } option was introduced to support creating embedded views on the fly.
  // When you are creating a view dynamically and want to acces the TemplateRef,
  // you won't be able to do so in ngAfterViewInit as it will cause a ExpressionHasChangedAfterChecked error.
  // Setting the static flag to true will create your view in ngOnInit.

  chkCompleted: FormControl;
  txtInput: FormControl;

  editing = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.chkCompleted = new FormControl(this.todo.isComplete);
    this.txtInput = new FormControl(this.todo.text, Validators.required);

    this.chkCompleted.valueChanges.subscribe(valor => {
      this.store.dispatch(actions.toggleTask({ id: this.todo.id }));
    });

  }

  editar() {
    this.editing = true;
    this.txtInput.setValue(this.todo.text);

    setTimeout(() => {
      this.txtItemToEdit.nativeElement.select();
    }, 2);
  }

  terminarEdicion() {
    this.editing = false;

    if (this.txtInput.valid && this.txtInput.value !== this.todo.text) {
      this.store.dispatch(actions.editTask({ id: this.todo.id, text: this.txtInput.value }));
    }
  }

  borrar() {
    this.store.dispatch(actions.deleteTask({ id: this.todo.id }));
  }

}
