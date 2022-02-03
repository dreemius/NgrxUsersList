import {createFeatureSelector, createSelector} from '@ngrx/store';
import {User} from '../models/user';

export const selectUsers = createFeatureSelector<ReadonlyArray<User>>('users');

export const getFiltered = createSelector(
    selectUsers,
    (users, props) => {
        return users.filter(item => item.username.toLowerCase().includes(props.query.toLowerCase()));
    }
);
