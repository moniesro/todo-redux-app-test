import { createReducer, on } from '@ngrx/store';
import { setFilterTask, filterOptions } from './filter.actions';

export const initialState: filterOptions = 'todos';

// tslint:disable-next-line:variable-name
const _filterReducer = createReducer(initialState,
    on(setFilterTask, (state, { filter }) => filter)
);

export function filterReducer(state, action) {
    return _filterReducer(state, action);
}
