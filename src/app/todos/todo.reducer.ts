import { createReducer, on } from '@ngrx/store';
import { addTask, toggleTask, editTask, deleteTask, toggleAllTask, deleteAllCompletedTasks } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Comprar traje'),
    new Todo('Tomar un descanso'),
    new Todo('Sonreir'),
];

// tslint:disable-next-line:variable-name
const _todoReducer = createReducer(initialState,
    // normalmente se usaria push pero esto puede hacer que el estado mute, por lo que usaremos la destructuracion
    // tslint:disable-next-line:max-line-length
    // extraer cada uno de los items y devolverlos de manera independiente, luego solo se agrega el nuevo item al arreglo usando new Todo(texto)
    on(addTask, (state, { text }) => [...state, new Todo(text)]),
    on(toggleTask, (state, { id }) => {
        return state.map(todo => {
            if (todo.id === id) {
                // esto no se puede hacer pq estariamos mutando el objeto: se puede ver en la consola de redux
                // todo.isComplete = !todo.isComplete;
                // return todo;

                return { // retorna todas las propiedades pero para el todo con el id cambia el estado
                    ...todo, // gracias a este operador aseguramos la inmutabilidad
                    isComplete: !todo.isComplete
                };
            } else {
                return todo; // regreso el mismo todo
            }
        }); // retorar un nuevo elemento, con map nos aseguramos de retornar un nuevo arreglo
    }),
    on(editTask, (state, { id, text }) => {
        return state.map(todo => {
            if (todo.id === id) {
                // esto no se puede hacer pq estariamos mutando el objeto: se puede ver en la consola de redux
                // todo.isComplete = !todo.isComplete;
                // return todo;

                return { // retorna todas las propiedades pero para el todo con el id cambia el estado
                    ...todo, // gracias a este operador aseguramos la inmutabilidad
                    text
                };
            } else {
                return todo; // regreso el mismo todo
            }
        }); // retorar un nuevo elemento, con map nos aseguramos de retornar un nuevo arreglo
    }),
    on(deleteTask, (state, { id }) => {
        return state.filter(value => value.id !== id);
    }),
    on(toggleAllTask, (state, { completed }) => {

        return state.map(todo => {
            // return {
            //     ...todo,
            //     completed: completed // de esta manera se cambia todas las propiedades de cada todo con el nuevo valor
            // }

            if (todo.isComplete !== completed) {
                todo.isComplete = completed;
                return {
                    ...todo
                };
            } else {
                return todo;
            }
        });

    }),
    on(deleteAllCompletedTasks, (state) => {
        return state.filter(todo => !todo.isComplete);
    })

);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}
