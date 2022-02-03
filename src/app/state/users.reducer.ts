import {createReducer, on} from '@ngrx/store';

import {addUser, removeUsers, setUsersList, sortUsers} from './users.actions';
import {User} from '../models/user';

export const initialState: ReadonlyArray<User> = [];


const sortUsersInState = (state, {sortDirection}) => {
    return [...state].sort((a, b) => sortDirection * (a.username > b.username ? 1 : -1));
};

const removeUsersFromState = (state, {users}) => {
    users.forEach((user) => {
        state = state.filter(item => item.id !== user.id);
    });
    return [...state];
};

export const usersReducer = createReducer(
    initialState,
    on(setUsersList, (state, {usersList}) => usersList),
    on(addUser, (state, {user, sortDirection}) => {
        return sortUsersInState([...state, user], {sortDirection});
    }),
    on(removeUsers, removeUsersFromState),
    on(sortUsers, sortUsersInState),
);


