import { createAction, props } from '@ngrx/store';

export type filterOptions = 'todos' | 'completados' | 'pendientes';

export const setFilterTask = createAction(
    '[Filter] set filter',
    props<{ filter: filterOptions }>()
);

