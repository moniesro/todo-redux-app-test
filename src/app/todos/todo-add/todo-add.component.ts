import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer'; // path relativo
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl;

  // para disparar la accion se importa el store y se define el state
  constructor(private store: Store<AppState>) {
    this.txtInput = new FormControl('', Validators.required);
  }

  ngOnInit() {
  }

  add() {
    if (this.txtInput.valid) {
      this.store.dispatch(actions.addTask({ text: this.txtInput.value }));

      this.txtInput.reset();
    }
  }

}
