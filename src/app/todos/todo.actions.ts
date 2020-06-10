import { createAction, props } from '@ngrx/store';

export const addTask = createAction(
    '[TODO] add task',
    props<{ text: string }>()
);

export const toggleTask = createAction(
    '[TODO] toggle task',
    props<{ id: number }>()
);

export const toggleAllTask = createAction(
    '[TODO] toggleAll task',
    props<{ completed: boolean }>()
);

export const editTask = createAction(
    '[TODO] edit task',
    props<{ id: number, text: string }>()
);

export const deleteTask = createAction(
    '[TODO] delete task',
    props<{ id: number }>()
);

export const deleteAllCompletedTasks = createAction(
    '[TODO] delete all completed tasks'
);


