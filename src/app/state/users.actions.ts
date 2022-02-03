import {createAction, props} from '@ngrx/store';
import {User} from '../models/user';

export const setUsersList = createAction(
    '[Users List] Save Users Success',
    props<{ usersList: ReadonlyArray<User> }>()
);

export const addUser = createAction(
    '[Users List] Add User',
    props<{ user: User, sortDirection: number }>()
);

export const removeUsers = createAction(
    '[Users List] Remove Users',
    props<{ users: User[] }>()
);

export const sortUsers = createAction(
    '[Users List] Sort Users',
    props<{ sortDirection: number }>()
);


