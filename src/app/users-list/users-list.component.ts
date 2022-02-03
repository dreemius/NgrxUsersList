import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UsersService} from './../users.service';
import {User} from '../models/user';
import {MatListOption} from '@angular/material/list';
import {Store} from '@ngrx/store';
import {getFiltered, selectUsers} from '../state/users.selectors';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    @ViewChildren(NgModel) fields: QueryList<NgModel>;

    usersList: User[] = [];
    username: string;
    name: string;
    role: string;
    selectedList: User[] = [];
    usersList$ = this.store.select(selectUsers);

    constructor(private store: Store, public userService: UsersService) {
    }

    ngOnInit(): void {
        this.userService.setUsersListToStore();
    }

    search(query: string): void {
        this.usersList$ = this.store.select(getFiltered, {query});
    }

    sort(direction: string): void {
        this.userService.sortUsers(direction);
    }

    addUser(): void {
        this.userService.addUser({
            id: Math.floor((Math.random() * 20) + 10),
            name: this.name,
            username: this.username,
            email: '',
            role: this.role,
            phone: '',
            website: ''
        });
        this.clearFields();
    }

    clearFields(): void {
        this.name = '';
        this.username = '';
        this.role = '';
        this.fields.forEach(model => {
            model.control.reset();
        });
    }

    selectItem(selectedUsers: MatListOption[]): void {
        selectedUsers.forEach(element => this.selectedList.push(element.value));
    }

    deleteUsers(): void {
        this.userService.deleteUsers(this.selectedList);
    }


}
