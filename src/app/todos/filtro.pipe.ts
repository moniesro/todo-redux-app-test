import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { filterOptions } from '../filter/filter.actions';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(value: Todo[], filter: filterOptions): Todo[] {

    switch (filter) {
      case 'completados':
        return value.filter(v => v.isComplete);
      case 'pendientes':
        return value.filter(v => !v.isComplete);

      default:
        return value;
    }
  }

}
