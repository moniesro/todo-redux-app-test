import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filterOptions } from 'src/app/filter/filter.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  currentFilter: filterOptions;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // Hacer la subscripcion al store
    // this.store.select('todos').subscribe(todos => this.todos = todos);

    this.store.subscribe(state => {
      this.todos = state.todos;
      this.currentFilter = state.filter;
    });

    // destructuracion
    // this.store.subscribe(({ todos, filter }) => {
    //   this.todos = todos;
    //   this.currentFilter = filter;
    // });
  }

}
