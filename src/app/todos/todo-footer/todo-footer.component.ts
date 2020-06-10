import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { filterOptions } from 'src/app/filter/filter.actions';
import * as filterActions from 'src/app/filter/filter.actions';
import * as todoActions from '../todo.actions';
import { AppState } from 'src/app/app.reducer';


@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  currentFilter: filterOptions = 'todos';
  filters: filterOptions[] = ['todos', 'completados', 'pendientes'];
  pendientes = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // suscribirse al store
    // this.store.select('filters').subscribe(filter => {
    //   console.log(filter);
    //   this.currentFilter = filter; // mi filtro actual, el seleccionado, en el primer caso es el valor de la inicializacion
    // });

    // necesito conocer los todos y el filtro
    this.store.subscribe(state => {
      this.currentFilter = state.filter;
      this.pendientes = state.todos.filter(todo => !todo.isComplete).length;

    });
  }

  onFilterChange(filter: filterOptions) {
    this.store.dispatch(filterActions.setFilterTask({ filter }));
    // { filter: filter } = { filter } el valor tiene el mismo nombre de la variable
  }

  deleteAllCompleted() {
    this.store.dispatch(todoActions.deleteAllCompletedTasks());
  }

}
