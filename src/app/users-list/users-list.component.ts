import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, flatMap, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../shared/user.model';
import { UsersService } from './../users.service';
import { Routes } from '../shared/routes';
import { isArray } from 'util';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private readonly SEARCH_DELAY_MLS = 500;

  isUsersLoaded: boolean;
  users: User[];
  searchField: FormControl;

  constructor(private usersService: UsersService,
              private router: Router) {}

  buildControls() {
    this.searchField = new FormControl();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onSearchUsers() {
    this.searchField.valueChanges
      .pipe(
        debounceTime(this.SEARCH_DELAY_MLS),
        distinctUntilChanged(),
        flatMap((firstName: string) => this.usersService.searchUsersByFirstName(firstName))
      )
      .subscribe((users: User[]) => this.users = users);
  }

  isLoaderVisible(isLoaderVisible: boolean): void {
    this.isUsersLoaded = !isLoaderVisible;
  }

  ngOnInit() {
    this.buildControls();
    this.getUsers();
    this.onSearchUsers();
  }

  goToUserDetails(user: User): void {
    this.router.navigate([Routes.USER_DETAILS, user.id]);
  }

  isNoneUserSelected(): boolean {
    return this.getNumOfSelectedUsers() === 0;
  }

  getNumOfSelectedUsers(): number {
    return  isArray(this.users) ? this.users.filter((user: any) => user.isSelected).length : 0;
  }

  getSelectedUsers(): User[] {
    return isArray(this.users) ? this.users.filter((user: any) => user.isSelected) : [];
  }

  remove(user: User): void {
    this.usersService.deleteUser(user.id).subscribe();
    this.getUsers();
  }

  removeSelected(): void {
    const usersId = this.users.filter((user: any) => user.isSelected)
      .map((user: User) => user.id);

    usersId.forEach(id => this.usersService.deleteUser(id).subscribe());
    this.getUsers();
  }
}
