// App state total de la aplicacion

import { Todo } from './todos/models/todo.model';
import { ActionReducerMap } from '@ngrx/store';
import { todoReducer } from './todos/todo.reducer';
import { filterOptions } from './filter/filter.actions';
import { filterReducer } from './filter/filter.reducer';

export interface AppState {
    todos: Todo[];
    filter: filterOptions;
}


export const appReducers: ActionReducerMap<AppState> = {

    todos: todoReducer,
    filter: filterReducer

};
